using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.User.Commands.UpdateUserRole
{
    public class UpdateUserRoleCommand : IRequest<bool>
    {
        public string UserId { get; set; }

        public string NewRole { get; set; }
    }
}
