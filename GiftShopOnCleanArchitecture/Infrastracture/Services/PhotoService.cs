using Application.Common.Interfaces;
using Domain.Entities;
using Infrastracture.Extensions;
using Infrastracture.Persistence;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.Services
{
    public class PhotoService : BaseService<Photo>, IPhotoService
    {
        private readonly Lazy<HttpClient> _client;

        public PhotoService(
            AppDbContext context,
            IHttpClientFactory clientFactory)
            : base(context)
        {
            _client = new Lazy<HttpClient>(() => clientFactory.CreateClient());
        }

        public async Task<Photo> AddPhoto(IFormFile uploadedFile)
        {
            if (!IsValidImage(uploadedFile))
            {
                throw new ArgumentException();
            }

            byte[] imgData;
            using (var reader = new BinaryReader(uploadedFile.OpenReadStream()))
            {
                imgData = reader.ReadBytes((int)uploadedFile.Length);
            }

            var photo = new Photo
            {
                Thumb = GetResizedBytesFromFile(uploadedFile, 400),
                Img = GetResizedBytesFromFile(uploadedFile, 1200),
            };

            Insert(photo);
            await _context.SaveChangesAsync();

            return photo;
        }

        public async Task<Photo> AddPhotoByURL(string url)
        {
            if (!await IsImageUrl(url))
            {
                throw new ArgumentException();
            }

            Uri uri = new Uri(url);
            byte[] imgData = _client.Value.GetByteArrayAsync(uri).Result;
            var photo = new Photo
            {
                Thumb = imgData,
                Img = imgData,
            };

            Insert(photo);
            await _context.SaveChangesAsync();

            return photo;
        }

        private async Task<bool> IsImageUrl(string url)
        {
            try
            {
                HttpResponseMessage result = await _client.Value.GetAsync(url);
                return result.IsSuccessStatusCode;
            }
            catch (HttpRequestException)
            {
                return false;
            }
        }

        public async Task Delete(Guid id)
        {
            var photo = _context.Photos.Find(id);
            if (photo != null)
            {
                Delete(photo);
                await _context.SaveChangesAsync();
            }
        }

        private static bool IsValidImage(IFormFile file) => file != null && file.IsImage();

        public byte[] GetResizedBytesFromFile(IFormFile file, int newWidth)
        {
            using var memoryStream = file.OpenReadStream();
            var oldBitMap = new Bitmap(memoryStream);
            var newSize = new Size
            {
                Width = newWidth,
                Height = (int)(oldBitMap.Size.Height * newWidth / oldBitMap.Size.Width),
            };

            var newBitmap = new Bitmap(oldBitMap, newSize);

            return ImageToByteArray(newBitmap);
        }

        private byte[] ImageToByteArray(Image imageIn)
        {
            using var ms = new MemoryStream();
            imageIn.Save(ms, ImageFormat.Png);

            return ms.ToArray();
        }
    }
}
