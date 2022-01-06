using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class BoxTag
    {
        public Guid BoxId { get; set; }

        public Box Box { get; set; }

        public Guid TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
