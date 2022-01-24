using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class BoxDTO
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public Photo Photo { get; set; }

        public IEnumerable<UserBoxOrder> UserBoxOrders { get; set; }

        public IEnumerable<Rating> Ratings { get; set; }

        public IEnumerable<Comment> Comments { get; set; }

        public IEnumerable<Cart> Carts { get; set; }

        public IEnumerable<Relationship> Relationship { get; set; }

        public IEnumerable<BoxTag> BoxTag { get; set; }
    }
}
