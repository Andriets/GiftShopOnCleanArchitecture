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

namespace Application.Boxes.Queries.GetBoxById
{
    public class GetBoxByIdQueryHandler : IRequestHandler<GetBoxByIdQuery, BoxDTO>
    {
        private readonly IAppDbContext _context;

        public GetBoxByIdQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public Task<BoxDTO> Handle(GetBoxByIdQuery request, CancellationToken cancellationToken)
        {
            var res = _context.Boxes
                .Include(b => b.Ratings)
                .Include(b => b.Comments)
                .Include(b => b.Relationship)
                .Include(b => b.BoxTag)
                    .ThenInclude(bt => bt.Tag)
                .FirstOrDefault(b => b.Id == request.BoxId);
            return Task.FromResult(res.ToDTO());
        }
    }
}
