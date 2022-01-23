using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.User.Commands.AuthorizeUser
{
    public class AuthorizeUserCommand : IRequest<AuthenticateResponseModel>
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
