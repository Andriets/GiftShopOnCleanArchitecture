using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.DeleteBoxComment
{
    public class DeleteBoxCommentCommandHandler : IRequestHandler<DeleteBoxCommentCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public DeleteBoxCommentCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Guid> Handle(DeleteBoxCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = await _context.Comments.FindAsync(request.CommentId);

            if (comment is null)
            {
                throw new GiftShopException("Comment not found");
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync(cancellationToken);

            return comment.Id;
        }
    }
}
