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
    public class GetAllBoxesQueryHandler : IRequestHandler<GetAllBoxesQuery, PaginatedResponse<BoxDTO>>
    {
        private readonly IAppDbContext _context;

        public GetAllBoxesQueryHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public Task<PaginatedResponse<BoxDTO>> Handle(GetAllBoxesQuery request, CancellationToken cancellationToken)
        {
            var boxes = _context.Boxes
                .Include(b => b.Photo)
                .Include(b => b.Ratings)
                .Include(b => b.Comments)
                .Include(b => b.Relationship)
                .Include(b => b.BoxTag)
                    .ThenInclude(bt => bt.Tag)
                .AsNoTracking()
                .AsEnumerable();

            if (request.MinPrice is not null)
            {
                boxes = boxes.Where(b => b.Price >= request.MinPrice
                              && b.Price <= request.MaxPrice);
            }

            boxes = !string.IsNullOrEmpty(request.KeyWord)
                ? boxes.Where(b => b.Title.Contains(request.KeyWord)
                    || b.Description.Contains(request.KeyWord))
                : boxes;

            if (request.Tags is not null)
            {
                boxes = boxes.Where(b => b.BoxTag.Select(bt => bt.TagId).Intersect(request.Tags.Select(t => t.Id)).Count() != 0);
            }

            PaginatedResponse<BoxDTO> res = new PaginatedResponse<BoxDTO>();
            res.CurrentPage = request.Page;
            res.TotalPages = (int)Math.Ceiling((double)boxes.Count() / request.PageSize);

            boxes = request.PageSize != 0
                ? boxes.OrderBy(b => b.Price)
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                : boxes.OrderBy(b => b.Price);

            res.Items = boxes.Select(b => b.ToDTO());

            return Task.FromResult(res);
        }
    }
}
