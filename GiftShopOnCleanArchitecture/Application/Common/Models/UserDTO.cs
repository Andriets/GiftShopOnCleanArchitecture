using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class UserDTO
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Region { get; set; }

        public string Role { get; set; }

        public string City { get; set; }

        public string PostOffice { get; set; }

        public string History { get; set; }

        public Photo Photo { get; set; }
    }
}
