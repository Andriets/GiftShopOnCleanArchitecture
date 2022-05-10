using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.AddBoxComment
{
    public class AddBoxCommentCommandHandler : IRequestHandler<AddBoxCommentCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public AddBoxCommentCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Guid> Handle(AddBoxCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = new Comment
            {
                UserId = request.UserId,
                BoxId = request.BoxId,
                CommentText = request.CommentText
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync(cancellationToken);

            return comment.Id;
        }
    }
}
