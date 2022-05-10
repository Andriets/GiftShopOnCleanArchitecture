using Application.Boxes.Queries.GetBasicFiltersData;
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

namespace Application.Boxes.Queries.GetBasicFiltersInfo
{
    public class GetBasicFiltersInfoQueryHandler : IRequestHandler<GetBasicFiltersInfoQuery, BasicFiltersInfo>
    {
        private readonly IAppDbContext _context;

        public GetBasicFiltersInfoQueryHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<BasicFiltersInfo> Handle(GetBasicFiltersInfoQuery request, CancellationToken cancellationToken)
        {
            var BasicFiltersInfo = new BasicFiltersInfo();

            BasicFiltersInfo.MinPrice = await _context.Boxes.MinAsync(b => b.Price);
            BasicFiltersInfo.MaxPrice = await _context.Boxes.MaxAsync(b => b.Price);


            BasicFiltersInfo.TotalPages = (int)Math.Ceiling((double)await _context.Boxes.CountAsync() / 6);

            BasicFiltersInfo.Tags = await _context.Tags.Select(tag => new TagCount 
            { 
                Tag = new TagDTO() { Id = tag.Id, TagName = tag.TagName }, 
                Count = _context.BoxTag.Where(bt => bt.TagId == tag.Id).Count()
            }).ToListAsync();

            return BasicFiltersInfo;
        }
    }
}
