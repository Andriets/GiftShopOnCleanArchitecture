using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts.Commands.ClearUserCart
{
    public class ClearUserCartCommand : IRequest<bool>
    {
        public string UserId { get; set; }
    }
}
