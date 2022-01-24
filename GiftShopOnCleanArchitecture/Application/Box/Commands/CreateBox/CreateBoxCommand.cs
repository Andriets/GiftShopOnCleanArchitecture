using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.CreateBox
{
    public class CreateBoxCommand : IRequest<Guid>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public Photo Photo { get; set; }

        public IEnumerable<BoxTag> BoxTag { get; set; }
    }
}
