using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands.UpdateUserRole
{
    public class UpdateUserRoleCommandHandler : IRequestHandler<UpdateUserRoleCommand, bool>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public UpdateUserRoleCommandHandler(IAppDbContext appDbContext, IIdentityService identityService)
        {
            _context = appDbContext;
            _identityService = identityService;
        }
        public async Task<bool> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var user = _context.Users.Find(request.UserId);

            if (user is null)
            {
                throw new GiftShopException("User not found");
            }

            await _identityService.ChangeUserRoleAsync(user.UserName, request.NewRole);

            return true;
        }
    }
}
