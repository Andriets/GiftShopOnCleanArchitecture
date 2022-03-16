using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Queries.GetAllBoxes
{
    public class GetAllBoxesQueryHandler : IRequestHandler<GetAllBoxesQuery, IEnumerable<BoxDTO>>
    {
        private readonly IAppDbContext _context;

        public GetAllBoxesQueryHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public Task<IEnumerable<BoxDTO>> Handle(GetAllBoxesQuery request, CancellationToken cancellationToken)
        {
            var boxes = _context.Boxes
                .Include(b => b.Ratings)
                .Include(b => b.Comments)
                .Include(b => b.Relationship)
                .Include(b => b.BoxTag)
                    .ThenInclude(bt => bt.Tag)
                .AsNoTracking()
                .AsQueryable();

            boxes = !string.IsNullOrEmpty(request.KeyWord)
                ? boxes.Where(b => b.Title.Contains(request.KeyWord)
                    || b.Description.Contains(request.KeyWord))
                : boxes;

            var res = request.PageSize != 0
                ? boxes.OrderBy(b => b.Price)
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .AsEnumerable()
                : boxes.OrderBy(b => b.Price)
                    .AsEnumerable();

            return Task.FromResult(res.Select(b => b.ToDTO()));
        }
    }
}
