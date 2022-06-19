using Application.Common.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Boxes.Commands.SetBoxRating
{
    public class SetBoxRatingCommandHandler : IRequestHandler<SetBoxRatingCommand, bool>
    {
        private readonly IAppDbContext _context;
        private readonly IRecommendService _recommendService;

        public SetBoxRatingCommandHandler(IAppDbContext appDbContext, IRecommendService recommendService)
        {
            _context = appDbContext;
            _recommendService = recommendService;
        }

        public async Task<bool> Handle(SetBoxRatingCommand request, CancellationToken cancellationToken)
        {
            var rating = _context.Ratings.FirstOrDefault(r => r.BoxId == request.BoxId && r.UserId == request.UserId);
            
            if (rating is not null)
            {
                rating.Score = request.Score;
            } else
            {
                rating = new Rating
                {
                    BoxId = request.BoxId,
                    UserId = request.UserId,
                    Score = request.Score
                };

                await _context.Ratings.AddAsync(rating);
            }

            await _context.SaveChangesAsync(cancellationToken);
            _recommendService.TrainModel();

            return true;
        }
    }
}
