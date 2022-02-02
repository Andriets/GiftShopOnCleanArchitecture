using Application.Common.Interfaces;
using Application.Orders.Commands.UpdateOrderStatus;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Orders.Commands.UpdateOrderStatus
{
    public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public UpdateOrderStatusCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == request.OrderId);

            if (order == null)
            {
                throw new GiftShopException("Order not found");
            }

            order.OrderStatus = request.NewOrderStatus;
            order.LastModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync(cancellationToken);

            return order.Id;
        }
    }
}
