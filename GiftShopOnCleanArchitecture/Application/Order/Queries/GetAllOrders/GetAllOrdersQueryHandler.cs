using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Orders.Queries.GetAllOrders
{
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQuery, IEnumerable<OrderDTO>>
    {
        private readonly IAppDbContext _context;

        public GetAllOrdersQueryHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public Task<IEnumerable<OrderDTO>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = _context.Orders
                .Include(o => o.User)
                    .ThenInclude(u => u.Photo)
                .Include(o => o.BoxOrders)
                    .ThenInclude(bo => bo.Box)
                .Where(o => o.OrderDate > DateTime.Now.Date.AddDays(-15))
                .AsNoTracking()
                .AsEnumerable();

            return Task.FromResult(orders.Select(o => o.ToDTO()));

        }
    }
}
