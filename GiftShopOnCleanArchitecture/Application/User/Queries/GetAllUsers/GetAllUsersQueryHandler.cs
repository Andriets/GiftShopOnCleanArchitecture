using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Queries.GetAllUsers
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserDTO>>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public GetAllUsersQueryHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public Task<IEnumerable<UserDTO>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = _context.Users
                .Include(u => u.Photo)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.KeyWord))
            {
                users = users.Where(u => u.FirstName.Contains(request.KeyWord) || u.LastName.Contains(request.KeyWord));
            }

            var res = users.Select(u => u.ToDTO()).AsEnumerable();

            if (!string.IsNullOrEmpty(request.Role))
            {
                res = res.Where(u => _identityService.IsInRoleAsync(u.Id, request.Role).Result);
            }

            res = res.Select(u =>
            {
                var roles = _identityService.GetUserRolesByUserNameAsync(u.Email).Result;
                u.Role = roles.ToArray()[0];
                return u;
            });

            return Task.FromResult(res);
        }
    }
}
