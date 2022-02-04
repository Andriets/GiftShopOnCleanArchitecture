using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Tags.Queries.GetAllTags
{
    public class GetAllTagsQuery : IRequest<IEnumerable<TagDTO>>
    {
        public string KeyWord { get; set; }
    }
}
