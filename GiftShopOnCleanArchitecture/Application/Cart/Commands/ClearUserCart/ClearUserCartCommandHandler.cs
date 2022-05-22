using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Carts.Commands.ClearUserCart
{
    public class ClearUserCartCommandHandler : IRequestHandler<ClearUserCartCommand, bool>
    {
        private readonly IAppDbContext _context;

        public ClearUserCartCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<bool> Handle(ClearUserCartCommand request, CancellationToken cancellationToken)
        {
            var cart = _context.Carts.Where(c => c.UserId == request.UserId);

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
