using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.UpdateUserInfo
{
    public class UpdateUserInfoCommandHandler : IRequestHandler<UpdateUserInfoCommand, UserDTO>
    {
        private readonly IAppDbContext _context;

        public UpdateUserInfoCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<UserDTO> Handle(UpdateUserInfoCommand request, CancellationToken cancellationToken)
        {
            var appUser = await _context.Users.FindAsync(request.Id);

            if (appUser == null)
            {
                throw new GiftShopException("User not found");
            }

            if (!string.IsNullOrEmpty(request.Email))
            {
                appUser.Email = request.Email;
                appUser.UserName = request.Email;
            }

            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                appUser.PhoneNumber = request.PhoneNumber;
            }

            if (!string.IsNullOrEmpty(request.FirstName))
            {
                appUser.FirstName = request.FirstName;
            }

            if (!string.IsNullOrEmpty(request.LastName))
            {
                appUser.LastName = request.LastName;
            }

            if (!string.IsNullOrEmpty(request.Region))
            {
                appUser.Region = request.Region;
            }

            if (!string.IsNullOrEmpty(request.City))
            {
                appUser.City = request.City;
            }

            if (!string.IsNullOrEmpty(request.PostOffice))
            {
                appUser.PostOffice = request.PostOffice;
            }

            await _context.SaveChangesAsync(cancellationToken);

            return appUser.ToDTO();
        }
    }
}
