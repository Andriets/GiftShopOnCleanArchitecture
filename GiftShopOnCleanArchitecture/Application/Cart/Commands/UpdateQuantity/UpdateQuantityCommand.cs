using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts.Commands.UpdateQuantity
{
    public class UpdateQuantityCommand : IRequest<bool>
    {
        public string UserId { get; set; }

        public Guid BoxId { get; set; }

        public int NewQuantity { get; set; }
    }
}
