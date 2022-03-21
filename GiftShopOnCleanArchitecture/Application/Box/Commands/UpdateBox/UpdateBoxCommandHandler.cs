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
                .Include(b => b.Comments)
                .Include(b => b.BoxTag)
                    .ThenInclude(bt => bt.Tag)
                .FirstOrDefault(b => b.Id == request.Id);

            box.Title = request.Title;
            box.Description = request.Description;
            box.Price = request.Price;
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

            box.BoxTag = request.BoxTag?.Select(bt => new BoxTag { Box = box, TagId = bt.TagId }).ToList();
            
            await _context.SaveChangesAsync(cancellationToken);

            return box.Id;
        }
    }
}
