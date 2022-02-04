using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tags.Commands.DeleteTag
{
    public class DeleteTagCommandHandler : IRequestHandler<DeleteTagCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public DeleteTagCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Guid> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
        {
            var tag = _context.Tags.FirstOrDefault(t => t.Id == request.TagId);

            if (tag == null)
            {
                throw new GiftShopException("Tag not found");
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync(cancellationToken);

            return tag.Id;
        }
    }
}
