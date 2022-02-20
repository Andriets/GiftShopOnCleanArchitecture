using Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Commands.UpdateUserPhoto
{
    public class UpdateUserPhotoCommand : IRequest<UserDTO>
    {
        public string UserId { get; set; }

        public IFormFile Photo { get; set; }
    }
}
