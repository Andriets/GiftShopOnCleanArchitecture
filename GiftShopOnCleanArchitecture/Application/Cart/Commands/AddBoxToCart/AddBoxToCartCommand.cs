using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts.Commands.AddBoxToCart
{
    public class AddBoxToCartCommand : IRequest<bool>
    {
        public string UserId { get; set; }

        public Guid BoxId { get; set; }
    }
}
