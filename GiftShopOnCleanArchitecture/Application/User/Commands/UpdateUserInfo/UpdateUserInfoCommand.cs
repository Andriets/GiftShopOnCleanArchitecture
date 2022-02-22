using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Commands.UpdateUserInfo
{
    public class UpdateUserInfoCommand : IRequest<UserDTO>
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Region { get; set; }

        public string City { get; set; }

        public string PostOffice { get; set; }
    }
}
