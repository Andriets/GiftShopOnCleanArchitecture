using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tags.Queries.GetAllTags
{
    public class GetAllTagsQueryHandler : IRequestHandler<GetAllTagsQuery, IEnumerable<TagDTO>>
    {
        private readonly IAppDbContext _context;

        public GetAllTagsQueryHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public Task<IEnumerable<TagDTO>> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
        {
            var tags = _context.Tags
                .AsNoTracking()
                .AsQueryable();

            tags = !string.IsNullOrEmpty(request.KeyWord)
                ? tags.Where(t => t.TagName.Contains(request.KeyWord))
                : tags;

            return Task.FromResult(tags.Select(t => new TagDTO() { Id = t.Id, TagName = t.TagName }).AsEnumerable());
        }
    }
}
