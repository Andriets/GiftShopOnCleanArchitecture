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

namespace Application.Carts.Queries.GetCartByBoxesIds
{
    public class GetCartsByBoxesIdsCommandHandler : IRequestHandler<GetCartsByBoxesIdsCommand, IEnumerable<BoxDTO>>
    {
        private readonly IAppDbContext _context;

        public GetCartsByBoxesIdsCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public Task<IEnumerable<BoxDTO>> Handle(GetCartsByBoxesIdsCommand request, CancellationToken cancellationToken)
        {
            if (request.BoxesIds is null)
            {
                return Task.FromResult((IEnumerable<BoxDTO>)new List<BoxDTO>());
            }

            var cart = _context.Boxes
                .Include(b => b.Photo)
                .Where(b => request.BoxesIds.Contains(b.Id))
                .ToList();

            return Task.FromResult(cart.Select(c => c.ToDTO()));
        }
    }
}
