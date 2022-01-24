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

namespace Application.User.Commands.AuthorizeUser
{
    public class AuthorizeUserCommandHandler : IRequestHandler<AuthorizeUserCommand, AuthenticateResponseModel>
    {
        private readonly IIdentityService _identityService;

        private readonly ITokenService _tokenService;

        public AuthorizeUserCommandHandler(IIdentityService identityService, 
            ITokenService tokenService)
        {
            _identityService = identityService;
            _tokenService = tokenService;
        }

        public async Task<AuthenticateResponseModel> Handle(AuthorizeUserCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.AuthorizeAsync(request.UserName, request.Password);

            if (!result)
            {
                throw new GiftShopException();
            }

            try
            {
                var userDTO = (await _identityService.GetUserByUserNameAsync(request.UserName)).ToDTO();
                var userRoles = await _identityService.GetUserRolesByUserNameAsync(userDTO.Email);
                userDTO.Role = userRoles[0];

                var jwtToken = _tokenService.GenerateAccessToken(userDTO);

                return new AuthenticateResponseModel
                {
                    Id = userDTO.Id,
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Role = userDTO.Role,
                    JwtToken = jwtToken
                };
            }
            catch (Exception ex)
            {
                throw new GiftShopException($"Something went wrong \n {ex.Message}");
            }
        }
    }
}
