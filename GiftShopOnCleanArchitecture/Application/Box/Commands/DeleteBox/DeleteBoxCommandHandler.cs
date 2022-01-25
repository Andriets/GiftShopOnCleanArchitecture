using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.DeleteBox
{
    public class DeleteBoxCommandHandler : IRequestHandler<DeleteBoxCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public DeleteBoxCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Guid> Handle(DeleteBoxCommand request, CancellationToken cancellationToken)
        {
            var box = _context.Boxes.Find(request.BoxId);
            if (box == null)
            {
                throw new GiftShopException("Box not found");
            }

            var userBoxOrders = _context.UserBoxOrder.Where(ubo => ubo.BoxId == box.Id).ToArray();

            if (userBoxOrders != null)
            {
                _context.UserBoxOrder.RemoveRange(userBoxOrders);
            }

            var ratings = _context.Ratings.Where(r => r.BoxId == box.Id).ToArray();

            if (ratings != null)
            {
                _context.Ratings.RemoveRange(ratings);
            }

            var comments = _context.Comments.Where(c => c.BoxId == box.Id).ToArray();

            if (comments != null)
            {
                _context.Comments.RemoveRange(comments);
            }

            var carts = _context.Carts.Where(c => c.BoxId != box.Id).ToArray();

            if (carts != null)
            {
                _context.Carts.RemoveRange(carts);
            }

            var relationships = _context.Relationship.Where(r => r.BoxId != box.Id).ToArray();

            if (relationships != null)
            {
                _context.Relationship.RemoveRange(relationships);
            }

            var boxTags = _context.BoxTag.Where(bt => bt.BoxId == box.Id).ToArray();

            if (boxTags != null)
            {
                _context.BoxTag.RemoveRange(boxTags);
            }

            _context.Boxes.Remove(box);
            await _context.SaveChangesAsync(cancellationToken);

            return box.Id;
        }
    }
}
