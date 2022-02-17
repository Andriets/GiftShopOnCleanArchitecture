using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.UpdateUserPhoto
{
    public class UpdateUserPhotoCommandHandler : IRequestHandler<UpdateUserPhotoCommand, bool>
    {
        private readonly IAppDbContext _context;

        private readonly IPhotoService _photoService;

        public UpdateUserPhotoCommandHandler(IAppDbContext appDbContext, IPhotoService photoService)
        {
            _context = appDbContext;
            _photoService = photoService;
        }

        public async Task<bool> Handle(UpdateUserPhotoCommand request, CancellationToken cancellationToken)
        {
            var appUser = await _context.Users.FindAsync(request.UserId);

            if (appUser == null)
            {
                throw new GiftShopException("User not found");
            }

            if (appUser.Photo != null)
            {
                await _photoService.Delete(appUser.Photo.Id);
            }

            appUser.Photo = await _photoService.AddPhoto(request.Photo);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
