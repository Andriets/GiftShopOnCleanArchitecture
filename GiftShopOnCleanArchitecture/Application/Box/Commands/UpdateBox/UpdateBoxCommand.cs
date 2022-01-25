using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Application.Boxes.Commands.UpdateBox
{
    public class UpdateBoxCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public IFormFile Photo { get; set; }

        public Photo PhotoBytes { get; set; }

        public IEnumerable<Rating> Ratings { get; set; }

        public IEnumerable<Comment> Comments { get; set; }

        public IEnumerable<Relationship> Relationship { get; set; }

        public IEnumerable<BoxTag> BoxTag { get; set; }
    }
}
