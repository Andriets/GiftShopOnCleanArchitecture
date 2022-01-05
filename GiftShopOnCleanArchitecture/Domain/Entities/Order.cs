using Domain.Emuns;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order : BaseEntity
    {
        public string UserName { get; set; }

        public string PhoneNumber { get; set; }

        public string Region { get; set; }

        public string City { get; set; }

        public string PostOffice { get; set; }

        public DateTime OrderDate { get; set; }

        public OrderStatus OrderStatus { get; set; }
        
        public virtual IEnumerable<UserBoxOrder> UserBoxOrders { get; set; }

    }
}
