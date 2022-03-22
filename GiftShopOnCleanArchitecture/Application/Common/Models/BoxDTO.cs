using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class BoxDTO
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public IFormFile Photo { get; set; }

        public Photo PhotoBytes { get; set; }

        public IEnumerable<TagDTO> Tags { get; set; }

        public IEnumerable<BoxCommentDetails> BoxCommentDetails { get; set; }

    }
}
