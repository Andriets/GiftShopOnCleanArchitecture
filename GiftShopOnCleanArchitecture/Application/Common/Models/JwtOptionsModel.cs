using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class JwtOptionsModel
    {
        public string SecretKey { get; set; }

        public double LifeTime { get; set; }
    }
}
