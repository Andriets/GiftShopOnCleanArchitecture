using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tags.Commands.CreateTag
{
    public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public CreateTagCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Guid> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            var tag = new Tag()
            {
                TagName = request.TagName
            };

            _context.Tags.Add(tag);
            await _context.SaveChangesAsync(cancellationToken);

            return tag.Id;
        }
    }
}
