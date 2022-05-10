using Application.Common.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Mapping
{
    public static class CommentMappingExtension
    {
        public static Comment ToEntity(this CommentDTO commentDTO)
        {
            return new Comment
            {
                Id = commentDTO.Id,
                UserId = commentDTO.UserId,
                BoxId = commentDTO.BoxId,
                CommentText = commentDTO.CommentText
            };
        }

        public static CommentDTO ToDTO(this Comment comment)
        {
            return new CommentDTO
            {
                Id = comment.Id,
                UserId = comment.UserId,
                BoxId = comment.BoxId,
                CommentText = comment.CommentText
            };
        }
    }
}
