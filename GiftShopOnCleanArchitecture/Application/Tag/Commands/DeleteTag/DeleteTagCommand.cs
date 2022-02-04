using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Tags.Commands.DeleteTag
{
    public class DeleteTagCommand : IRequest<Guid>
    {
        public Guid TagId { get; set; }
    }
}
