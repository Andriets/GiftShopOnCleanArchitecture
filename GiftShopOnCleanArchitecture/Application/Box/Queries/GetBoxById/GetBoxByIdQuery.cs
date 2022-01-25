using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Queries.GetBoxById
{
    public class GetBoxByIdQuery : IRequest<BoxDTO>
    {
        public Guid BoxId { get; set; }
    }
}
