using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Cart
    {
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public Guid BoxId { get; set; }

        public virtual Box Box { get; set; }
    }
}
