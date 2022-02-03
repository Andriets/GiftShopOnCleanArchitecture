using Application.Common.Models;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Boxes.Commands.CreateBox
{
    public class CreateBoxCommand : IRequest<Guid>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public IFormFile Photo { get; set; }

        public Photo PhotoBytes { get; set; }

        public IEnumerable<TagDTO> Tags { get; set; }
    }
}
