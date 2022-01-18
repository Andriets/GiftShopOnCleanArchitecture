using Application.Common.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Mapping
{
    public static class UserMappingExtension
    {
        public static ApplicationUser ToEntity(this UserDTO userDTO)
        {
            return new ApplicationUser()
            {
                Id = userDTO.Id,
                UserName = userDTO.Email,
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Email = userDTO.Email,
                Region = userDTO.Region,
                City = userDTO.City,
                PostOffice = userDTO.PostOffice,
                History = userDTO.History,
                Photo = userDTO.Photo
            };
        }
    }
}
