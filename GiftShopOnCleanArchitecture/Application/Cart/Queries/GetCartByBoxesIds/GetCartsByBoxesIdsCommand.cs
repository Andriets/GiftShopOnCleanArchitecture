using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts.Queries.GetCartByBoxesIds
{
    public class GetCartsByBoxesIdsCommand : IRequest<IEnumerable<BoxDTO>>
    {
        public IEnumerable<Guid> BoxesIds { get; set; }
    }
}
