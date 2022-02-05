using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts.Queries.GetUserCart
{
    public class GetUserCartQuery : IRequest<IEnumerable<BoxDTO>>
    {
        public string UserId { get; set; }
    }
}
