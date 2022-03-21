using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Exeptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.UpdateBox
{
    public class UpdateBoxCommandHandler : IRequestHandler<UpdateBoxCommand, Guid>
    {
        private readonly IAppDbContext _context;

        private readonly IPhotoService _photoService;

        public UpdateBoxCommandHandler(IAppDbContext appDbContext, IPhotoService photoService)
        {
            _context = appDbContext;
            _photoService = photoService;
        }

        public async Task<Guid> Handle(UpdateBoxCommand request, CancellationToken cancellationToken)
        {
            var box = _context.Boxes
                .Include(b => b.Photo)
                .Include(b => b.Comments)
                .Include(b => b.BoxTag)
                    .ThenInclude(bt => bt.Tag)
                .FirstOrDefault(b => b.Id == request.Id);

            if (request.Title is not null)
            {
                box.Title = request.Title;
            }

            if (request.Description is not null)
            {
                box.Description = request.Description;
            }
            
            if (request.Price is not null)
            {
                box.Price = request.Price.Value;
            }
            
            if (box.Photo != null && request.Photo != null)
            {
                await _photoService.Delete(box.Photo.Id);
                try
                {
                    box.Photo = await _photoService.AddPhoto(request.Photo);
                } catch (ArgumentException)
                {
                    throw new GiftShopException("Invalid file");
                }
            }

            if (request.Tags.Any())
            {
                box.BoxTag = request.Tags.Select(t => new BoxTag { Box = box, TagId = t.Id }).ToList();
            }
            
            await _context.SaveChangesAsync(cancellationToken);

            return box.Id;
        }
    }
}
