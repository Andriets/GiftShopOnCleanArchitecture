using Domain.Emuns;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Commands.UpdateOrderStatus
{
    public class UpdateOrderStatusCommand : IRequest<Guid>
    {
        public Guid OrderId { get; set; }

        public OrderStatus NewOrderStatus { get; set; }
    }
}
