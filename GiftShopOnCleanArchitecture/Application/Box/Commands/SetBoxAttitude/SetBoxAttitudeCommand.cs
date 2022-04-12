using Domain.Emuns;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.SetBoxAttitude
{
    public class SetBoxAttitudeCommand : IRequest<bool>
    {
        public string UserId  { get; set; }

        public Guid BoxId { get; set; }

        public Attitude Attitude { get; set; }
    }
}
