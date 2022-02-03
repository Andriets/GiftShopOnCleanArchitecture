using Domain.Emuns;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class OrderDTO
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string PhoneNumber { get; set; }

        public string Region { get; set; }

        public string City { get; set; }

        public string PostOffice { get; set; }

        public DateTime OrderDate { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public string UserId { get; set; }

        public UserDTO User { get; set; }

        public IEnumerable<BoxDTO> Boxes { get; set; }
    }
}
