using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Carts.Commands.AddBoxToCart
{
    public class AddBoxToCartCommandHandler : IRequestHandler<AddBoxToCartCommand, bool>
    {
        private readonly IAppDbContext _context;

        public AddBoxToCartCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<bool> Handle(AddBoxToCartCommand request, CancellationToken cancellationToken)
        {
            var cart = new Cart()
            {
                UserId = request.UserId,
                BoxId = request.BoxId,
                Quantity = 1
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync(cancellationToken);
            
            return true;
        }
    }
}
