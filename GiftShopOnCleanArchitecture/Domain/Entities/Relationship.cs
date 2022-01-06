using Domain.Emuns;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Relationship 
    {
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public Guid BoxId { get; set; }

        public Box Box { get; set; }

        public Attitude Attitude { get; set; }
    }
}
