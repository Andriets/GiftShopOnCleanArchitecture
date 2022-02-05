using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Carts.Commands.DeleteBoxesFromCart
{
    public class DeleteBoxesFromCartCommandHandler : IRequestHandler<DeleteBoxesFromCartCommand, bool>
    {
        private readonly IAppDbContext _context;

        public DeleteBoxesFromCartCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<bool> Handle(DeleteBoxesFromCartCommand request, CancellationToken cancellationToken)
        {
            var cart = _context.Carts.Where(c => c.UserId == request.UserId && request.BoxesIds.Contains(c.BoxId));

            if (!cart.Any())
            {
                throw new GiftShopException("Cart not found");
            }

            _context.Carts.RemoveRange(cart);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
