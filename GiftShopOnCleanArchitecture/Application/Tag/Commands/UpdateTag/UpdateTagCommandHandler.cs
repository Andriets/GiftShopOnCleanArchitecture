using Application.Common.Interfaces;
using Application.Tags.Commands.UpdateTag;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tags.Commands.UpdateTag
{
    public class UpdateTagCommandHandler : IRequestHandler<UpdateTagCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public UpdateTagCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Guid> Handle(UpdateTagCommand request, CancellationToken cancellationToken)
        {
            var tag = _context.Tags.FirstOrDefault(t => t.Id == request.TagId);

            tag.TagName = request.NewTagName;
            await _context.SaveChangesAsync(cancellationToken);

            return tag.Id;
        }
    }
}
