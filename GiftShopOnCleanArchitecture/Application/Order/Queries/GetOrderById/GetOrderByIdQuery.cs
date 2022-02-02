using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Queries.GetOrderById
{
    public class GetOrderByIdQuery : IRequest<OrderDTO>
    {
        public Guid OrderId { get; set; }
    }
}
