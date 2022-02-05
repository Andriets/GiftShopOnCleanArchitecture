using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts.Commands.DeleteBoxesFromCart
{
    public class DeleteBoxesFromCartCommand : IRequest<bool>
    {
        public string UserId { get; set; }

        public Guid[] BoxesIds { get; set; }
    }
}
