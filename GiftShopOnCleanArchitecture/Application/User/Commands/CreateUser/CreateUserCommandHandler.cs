using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
    {
        private readonly IIdentityService _identityService;

        private readonly IMapper _mapper;

        public CreateUserCommandHandler(IIdentityService identityService, IMapper mapper)
        {
            _identityService = identityService;
            _mapper = mapper;
        }

        public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var appUser = _mapper.Map<UserDTO, ApplicationUser>(request.User);
            appUser.Id = Guid.NewGuid().ToString();

            var res = await _identityService.CreateUserAsync(appUser.UserName, request.User.Password);

            if (res.Result.Succeeded)
            {
                return res.UserId;
            }

            throw new GiftShopExeption($"Creating new user failed: {res.Result.Errors}");
        }
    }
}
