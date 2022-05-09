using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.DeleteBoxComment
{
    public class DeleteBoxCommentCommand : IRequest<Guid>
    {
        public Guid CommentId { get; set; }
    }
}
