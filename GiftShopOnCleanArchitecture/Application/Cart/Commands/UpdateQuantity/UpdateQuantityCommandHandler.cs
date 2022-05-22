using Application.Common.Interfaces;
using Domain.Exeptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Carts.Commands.UpdateQuantity
{
    public class UpdateQuantityCommandHandler : IRequestHandler<UpdateQuantityCommand, bool>
    {
        private readonly IAppDbContext _context;

        public UpdateQuantityCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<bool> Handle(UpdateQuantityCommand request, CancellationToken cancellationToken)
        {
            var cart = _context.Carts.FirstOrDefault(c => c.UserId == request.UserId && c.BoxId == request.BoxId);

            if (cart is null)
            {
                throw new GiftShopException("Cart not found");
            }

            cart.Quantity = request.NewQuantity;
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
