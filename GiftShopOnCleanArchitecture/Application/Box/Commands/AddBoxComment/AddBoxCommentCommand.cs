using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.AddBoxComment
{
    public class AddBoxCommentCommand : IRequest<Guid>
    {
        public string UserId { get; set; }

        public Guid BoxId { get; set; }

        public string CommentText { get; set; }
    }
}
