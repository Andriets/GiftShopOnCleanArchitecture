using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class BasicFiltersInfo
    {
        public double MinPrice { get; set; }

        public double MaxPrice { get; set; }

        public int TotalPages { get; set; }

        public IEnumerable<TagCount> Tags { get; set; }
    }
}
