using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Queries.GetAllOrders
{
    public class GetAllOrdersQuery : IRequest<IEnumerable<OrderDTO>>
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public string KeyWord { get; set; }
    }
}
