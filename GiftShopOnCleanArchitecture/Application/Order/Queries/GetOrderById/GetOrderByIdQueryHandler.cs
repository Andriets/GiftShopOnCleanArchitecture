using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using Application.Orders.Queries.GetOrderById;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Orders.Queries.GetOrderById
{
    public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDTO>
    {
        private readonly IAppDbContext _context;

        public GetOrderByIdQueryHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public Task<OrderDTO> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
        {
            var orders = _context.Orders
                .Include(o => o.User)
                .FirstOrDefault(o => o.Id == request.OrderId);

            return Task.FromResult(orders.ToDTO());
        }
    }
}
