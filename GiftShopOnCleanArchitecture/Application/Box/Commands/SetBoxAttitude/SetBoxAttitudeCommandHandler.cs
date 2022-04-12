using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.SetBoxAttitude
{
    public class SetBoxAttitudeCommandHandler : IRequestHandler<SetBoxAttitudeCommand, bool>
    {
        private readonly IAppDbContext _context;

        public SetBoxAttitudeCommandHandler(IAppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<bool> Handle(SetBoxAttitudeCommand request, CancellationToken cancellationToken)
        {
            var Relationship = _context.Relationship.FirstOrDefault(r => r.UserId == request.UserId && r.BoxId == request.BoxId);
            
            if (Relationship is not null)
            {
                Relationship.Attitude = request.Attitude;
            } else
            {
                Relationship = new Relationship
                {
                    UserId = request.UserId,
                    BoxId = request.BoxId,
                    Attitude = request.Attitude

                };

                await _context.Relationship.AddAsync(Relationship);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
