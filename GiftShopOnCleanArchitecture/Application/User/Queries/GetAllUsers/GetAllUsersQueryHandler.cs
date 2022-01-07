using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Queries.GetAllUsers
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<ApplicationUser>>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IRecommendService _recommendService;

        private readonly IAppDbContext _context;

        public GetAllUsersQueryHandler(
            UserManager<ApplicationUser> userManager,
            IRecommendService recommendService,
            IAppDbContext context)
        {
            _userManager = userManager;
            _recommendService = recommendService;
            _context = context;
        }

        public Task<List<ApplicationUser>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            //_recommendService.TrainModel();
            _recommendService.GetRecomendations(null);
            return Task.FromResult(_context.Users.ToList());
        }
    }
}
