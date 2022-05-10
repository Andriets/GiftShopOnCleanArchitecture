using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using Domain.Exeptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Queries.GetUserById
{
    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDTO>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public GetUserByIdQueryHandler(IIdentityService identityService, IAppDbContext context)
        {
            _identityService = identityService;
            _context = context;
        }

        public async Task<UserDTO> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var appUser = _context.Users
                .Include(u => u.Photo)
                .FirstOrDefault(u => u.Id == request.UserId);

            if (appUser is null)
            {
                throw new GiftShopException("User not found");
            }

            var res = appUser.ToDTO();
            var roles = await _identityService.GetUserRolesByUserNameAsync(appUser.UserName);
            res.Role = roles.ToArray()[0];

            return res;
        }
    }
}
