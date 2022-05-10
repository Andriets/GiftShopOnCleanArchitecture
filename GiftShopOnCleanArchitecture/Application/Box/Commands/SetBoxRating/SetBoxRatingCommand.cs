using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.SetBoxRating
{
    public class SetBoxRatingCommand : IRequest<bool>
    {
        public string UserId { get; set; }

        public Guid BoxId { get; set; }

        public float Score { get; set; }
    }
}
