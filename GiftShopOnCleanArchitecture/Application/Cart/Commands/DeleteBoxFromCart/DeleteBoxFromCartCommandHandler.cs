using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Carts.Commands.DeleteBoxFromCart
{
    public class DeleteBoxFromCartCommandHandler : IRequestHandler<DeleteBoxFromCartCommand, bool>
    {
        private readonly IAppDbContext _context;

        public DeleteBoxFromCartCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<bool> Handle(DeleteBoxFromCartCommand request, CancellationToken cancellationToken)
        {
            var cart = _context.Carts.FirstOrDefault(c => c.UserId == request.UserId && c.BoxId == request.BoxId);

            if (cart is not null)
            {
                throw new GiftShopException("Cart not found");
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
