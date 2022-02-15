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
using Application.Common.Mapping;

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
            var appUser = request.User.ToEntity();
            appUser.Id = Guid.NewGuid().ToString();
            appUser.EmailConfirmed = true;

            var res = await _identityService.CreateUserAsync(appUser, request.User.Password);

            if (res.Result.Succeeded)
            {
                await _identityService.AddToRoleAsync(appUser, request.User.Role);
                return res.UserId;
            }

            throw new GiftShopException($"Creating new user failed: {res.Result.Errors}");
        }
    }
}
