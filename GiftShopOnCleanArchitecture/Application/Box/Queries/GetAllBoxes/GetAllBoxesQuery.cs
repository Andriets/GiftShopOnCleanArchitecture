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
    public class GetAllBoxesQuery : IRequest<PaginatedResponse<BoxDTO>>
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public double? MinPrice { get; set; }

        public double? MaxPrice { get; set; }

        public string KeyWord { get; set; }

        public IEnumerable<TagDTO> Tags { get; set; }
    }
}
