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
                .AsNoTracking()
                .AsQueryable();

            orders = !string.IsNullOrEmpty(request.KeyWord)
                ? orders.Where(o => o.UserName.Contains(request.KeyWord)
                    || o.PhoneNumber.Contains(request.KeyWord)
                    || o.Region.Contains(request.KeyWord)
                    || o.City.Contains(request.KeyWord)
                    || o.PostOffice.Contains(request.KeyWord))
                : orders;

            var res = orders.OrderByDescending(o => o.OrderDate)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .AsEnumerable();

            return Task.FromResult(res.Select(o => o.ToDTO()));

        }
    }
}
