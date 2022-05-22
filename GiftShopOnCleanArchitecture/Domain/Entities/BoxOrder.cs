using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class BoxOrder
    {
        public Guid BoxId { get; set; }

        public virtual Box Box { get; set; }

        public Guid OrderId { get; set; }

        public virtual Order Order { get; set; }

        public int Quantity { get; set; }
    }
}
