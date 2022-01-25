using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.CreateBox
{
    public class CreateBoxCommandHandler : IRequestHandler<CreateBoxCommand, Guid>
    {
        private readonly IAppDbContext _context;

        public CreateBoxCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Guid> Handle(CreateBoxCommand request, CancellationToken cancellationToken)
        {
            var box = new Box()
            {
                Title = request.Title,
                Description = request.Description,
                Price = request.Price,
                Photo = request.PhotoBytes,
                BoxTag = request.BoxTag
            };

            _context.Boxes.Add(box);
            await _context.SaveChangesAsync(cancellationToken);

            return box.Id;
        }
    }
}
