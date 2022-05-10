using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Queries.GetRecomendations
{
    public class GetRecomendationQueryHandler : IRequestHandler<GetRecomendationsQuery, IEnumerable<BoxDTO>>
    {
        private readonly IRecommendService _recommendService;

        public GetRecomendationQueryHandler(IRecommendService recommendService)
        {
            _recommendService = recommendService;
        }
        public async Task<IEnumerable<BoxDTO>> Handle(GetRecomendationsQuery request, CancellationToken cancellationToken)
        {
            var boxes = await _recommendService.GetRecomendations(request.UserId);

            var res = boxes.Select(b => b.ToDTO());

            return res;
        }
    }
}
