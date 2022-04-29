using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Emuns;
using Domain.Entities;
using Infrastracture.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using Microsoft.ML.Trainers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.Services
{
    public class RecommendService : IRecommendService
    {
        private static string BaseModelRelativePath = @"../../../../Infrastracture/Model";
        private static string ModelRelativePath = $"{BaseModelRelativePath}/model.zip";
        private readonly IAppDbContext _appDbContext;

        public RecommendService(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Task<IEnumerable<Box>> GetRecomendations(string userId)
        {
            var CFPrediction = GetColaborativeFilteringRecomendation(userId);
            var CBPrediction = GetContetBasedRecomendation(userId);
            var prediction = CFPrediction.Concat(CBPrediction).Distinct<Guid>().ToArray();
            List<Box> recommendedBoxes = new List<Box>();
            foreach (var boxId in prediction)
            {
                recommendedBoxes.Add(_appDbContext.Boxes
                    .Include(b => b.Photo)
                    .Include(b => b.Ratings)
                    .Include(b => b.Comments)
                        .ThenInclude(c => c.User)
                    .Include(b => b.Relationship)
                    .Include(b => b.BoxTag)
                        .ThenInclude(bt => bt.Tag)
                    .FirstOrDefault(b => b.Id == boxId));
            }
            return Task.FromResult(recommendedBoxes.AsEnumerable());
        }

        public void TrainModel()
        {
            MLContext mlContext = new MLContext();

            var data = _appDbContext.Ratings.ToArray();
            BoxRating[] entryData = new BoxRating[data.Length];
            for (int i = 0; i < data.Length; i++)
            {
                entryData[i] = new BoxRating { BoxId = data[i].BoxId.ToString(), UserId = data[i].UserId, Label = data[i].Score };
            }

            var trainingData = mlContext.Data.LoadFromEnumerable(entryData);

            IEstimator<ITransformer> estimator = mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "userIdEncoded", inputColumnName: "UserId")
                .Append(mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "boxIdEncoded", inputColumnName: "BoxId"));

            var options = new MatrixFactorizationTrainer.Options
            {
                MatrixColumnIndexColumnName = "userIdEncoded",
                MatrixRowIndexColumnName = "boxIdEncoded",
                LabelColumnName = "Label",
                NumberOfIterations = 20,
                ApproximationRank = 100
            };

            var trainerEstimator = estimator.Append(mlContext.Recommendation().Trainers.MatrixFactorization(options));

            var model = trainerEstimator.Fit(trainingData);

            /*var predictionEngine = mlContext.Model.CreatePredictionEngine<BoxRating, RatingPrediction>(model);

            var prediction = predictionEngine.Predict(new BoxRating
            {
                BoxId = "a450e1bd-3d98-4b2d-8027-35388d960092",
                UserId = "bc6c0c55-e6f0-434e-87bd-9cacad19e6b7"
            });*/

            mlContext.Model.Save(model, trainingData.Schema, GetAbsolutePath(ModelRelativePath));
        }

        private Guid[] GetColaborativeFilteringRecomendation(string id)
        {
            MLContext mlContext = new MLContext();
            ITransformer model;
            using (FileStream stream = new FileStream(GetAbsolutePath(ModelRelativePath), FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                model = mlContext.Model.Load(stream, out var modelInputSchema);
            }
            var predictionEngine = mlContext.Model.CreatePredictionEngine<BoxRating, RatingPrediction>(model);

            var boxes = _appDbContext.Boxes.Where(b => 
                !_appDbContext.BoxOrder.Any(ubo => ubo.BoxId == b.Id))
                .Select(b => b.Id)
                .ToArray();

            List<(Guid boxId, double score)> ratings = new List<(Guid boxId, double score)>();
            foreach (var boxId in boxes)
            {
                var prediction = predictionEngine.Predict(new BoxRating
                {
                    BoxId = boxId.ToString(),
                    UserId = id,
                });
                ratings.Add((boxId, Sigmoid(prediction.Score)));
            }
            return ratings.OrderByDescending(r => r.score).Take(2).Select(r => r.boxId).ToArray();
        }

        private Guid[] GetContetBasedRecomendation(string id)
        {
            var relationship = _appDbContext.Relationship
                .Where(r => r.UserId == id)
                .Include(r => r.Box)
                .ThenInclude(b => b.BoxTag)
                .ToList();
            var boxes = _appDbContext.Boxes.Include(b => b.BoxTag).ToList();
            var tags = _appDbContext.Tags.ToArray();
            var matrix = new Dictionary<Guid, (double[], Attitude)>();

            foreach (var r in relationship)
            {
                var arr = new double[tags.Length];
                for(int i = 0; i < arr.Length; i++)
                {
                    var boxTag = _appDbContext.BoxTag.SingleOrDefault(bt => bt.BoxId == r.Box.Id && bt.TagId == tags[i].Id);
                    arr[i] = r.Box.BoxTag.Contains(boxTag) 
                        ? 1 / Math.Sqrt(r.Box.BoxTag.ToArray().Length)
                        : 0;
                }
                matrix.Add(r.Box.Id, (arr, r.Attitude));
            }

            var userProfile = new double[tags.Length];
            Array.Clear(userProfile, 0, userProfile.Length);
            foreach (var m in matrix)
            {
                for (var i = 0; i < tags.Length; i++)
                {
                    userProfile[i] += m.Value.Item1[i] * (m.Value.Item2 == Attitude.Like ? 1 : -1);
                }
            }

            var DF_IDF = _appDbContext.BoxTag
                .Include(bt => bt.Tag)
                .GroupBy(t => t.TagId)
                .Select(t => new
                {
                    Id = t.Key,
                    TagName = t.SingleOrDefault(tt => tt.TagId == t.Key).Tag.TagName,
                    Count = t.Select(t => t.BoxId).Distinct().Count(),
                    DF = boxes.Count(),
                    IDF = (double)t.Select(t => t.BoxId).Distinct().Count() / (double)boxes.Count()
                }).ToArray();

            var boxesForPrediction = boxes.Where(b => !relationship.Contains(relationship.FirstOrDefault(r => r.BoxId == b.Id)))
                .Union(boxes.Where(b => relationship.Contains(relationship.FirstOrDefault(r => r.BoxId == b.Id && r.Attitude == Attitude.None))));

            var prediction = boxes.Where(b => boxesForPrediction.Contains(b))
                .Select(b => new
                {
                    BoxId = b.Id,
                    Title = b.Title,
                    Pred = CBPrediction(b, DF_IDF, userProfile)
                })
                .OrderByDescending(b => b.Pred)
                .Take(2)
                .ToArray();

            return new Guid[] { prediction[0].BoxId, prediction[1].BoxId };
        }

        private double CBPrediction(Box b, dynamic[] df_idf, double[] userProfile)
        {
            double pred = 0;
            var arr = new double[df_idf.Length];
            for (int i = 0; i < arr.Length; i++)
            {
                Guid tagId = df_idf[i].Id;
                var boxTag = _appDbContext.BoxTag.SingleOrDefault(bt => bt.BoxId == b.Id && bt.TagId == tagId);
                arr[i] = b.BoxTag.Contains(boxTag)
                    ? 1 / Math.Sqrt(b.BoxTag.ToArray().Length)
                    : 0;
            }
            for (int i = 0; i < df_idf.Length; i++)
            {
                pred += arr[i] * df_idf[i].IDF * userProfile[i];
            }
            return pred;
        }

        private string GetAbsolutePath(string relativeDatasetPath)
        {
            FileInfo _dataRoot = new FileInfo(typeof(RecommendService).Assembly.Location);
            string assemblyFolderPath = _dataRoot.Directory.FullName;

            string fullPath = Path.Combine(assemblyFolderPath, relativeDatasetPath);

            return fullPath;
        }

        private float Sigmoid(float x)
        {
            return (float)(100 / (1 + Math.Exp(-x)));
        }
    }
}
