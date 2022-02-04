using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Tags.Commands.UpdateTag
{
    public class UpdateTagCommand : IRequest<Guid>
    {
        public Guid TagId { get; set; }

        public string NewTagName { get; set; }
    }
}
