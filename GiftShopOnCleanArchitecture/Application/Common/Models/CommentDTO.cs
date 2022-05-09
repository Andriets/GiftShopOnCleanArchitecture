using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class CommentDTO
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public Guid BoxId { get; set; }

        public string CommentText { get; set; }
    }
}
