using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Domain.Entities
{
    public class Box : BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public virtual Photo Photo { get; set; }

        public virtual IEnumerable<UserBoxOrder> UserBoxOrders { get; set; }

        public virtual IEnumerable<Rating> Ratings { get; set; }

        public virtual IEnumerable<Comment> Comments { get; set; }

        public virtual IEnumerable<Cart> Carts { get; set; }

        public virtual IEnumerable<Relationship> Relationship { get; set; }

        public virtual IEnumerable<BoxTag> BoxTag { get; set; }
    }
}
