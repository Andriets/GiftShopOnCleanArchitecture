using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Queries.GetRecomendations
{
    public class GetRecomendationsQuery : IRequest<IEnumerable<BoxDTO>>
    {
        public string UserId { get; set; }
    }
}
