using Application.Common.Models;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Queries.GetAllBoxes
{
    public class GetAllBoxesQuery : IRequest<IEnumerable<BoxDTO>>
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public string KeyWord { get; set; }
    }
}
