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

namespace Application.Carts.Queries.GetUserCart
{
    public class GetUserCartQueryHandler : IRequestHandler<GetUserCartQuery, IEnumerable<BoxDTO>>
    {
        private readonly IAppDbContext _context;

        public GetUserCartQueryHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public Task<IEnumerable<BoxDTO>> Handle(GetUserCartQuery request, CancellationToken cancellationToken)
        {
            var cart = _context.Carts
                .Where(c => c.UserId == request.UserId)
                .Include(c => c.Box)
                .AsEnumerable();

            return Task.FromResult(cart.Select(c => c.Box.ToDTO()));
        }
    }
}
