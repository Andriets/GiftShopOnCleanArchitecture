using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Region { get; set; }

        public string City { get; set; }

        public string PostOffice { get; set; }

        public string History { get; set; }

        public virtual Photo Photo { get; set; }

        public virtual IEnumerable<BoxOrder> BoxOrders { get; set; }

        public virtual IEnumerable<Cart> CartList { get; set; }

        public virtual IEnumerable<Rating> BoxRatings { get; set; }

        public virtual IEnumerable<Comment> BoxComments { get; set; }

        public virtual IEnumerable<Relationship> Relationship { get; set; }

        public virtual IEnumerable<Order> Orders { get; set; }
    }
}
