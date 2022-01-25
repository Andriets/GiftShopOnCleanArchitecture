using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IPhotoService
    {
        Task<Photo> AddPhoto(IFormFile uploadedFile);

        Task<Photo> AddPhotoByURL(string url);

        Task Delete(Guid id);
    }
}
