using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.User.Queries.GetUserById
{
    public class GetUserByIdQuery : IRequest<UserDTO>
    {
        public string UserId { get; set; }
    }
}
