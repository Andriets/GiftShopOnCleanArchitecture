using Application.Common.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Mapping
{
    public static class BoxMappingExtension
    {
        public static Box ToEntity(this BoxDTO boxDTO)
        {
            return new Box()
            {
                Id = boxDTO.Id,
                Title = boxDTO.Title,
                Description = boxDTO.Description,
                Price = boxDTO.Price,
                Photo = boxDTO.PhotoBytes
            };
        }

        public static BoxDTO ToDTO(this Box box)
        {
            return new BoxDTO()
            {
                Id = box.Id,
                Title = box.Title,
                Description = box.Description,
                Price = box.Price,
                PhotoBytes = box.Photo,
                BoxCommentDetails = from c in box.Comments
                                    join r in box.Ratings on c.UserId equals r.UserId into CommentsRatings
                                    from cr in CommentsRatings.DefaultIfEmpty()
                                    join rel in box.Relationship on cr.UserId equals rel.UserId into ComRatRel
                                    from clr in ComRatRel.DefaultIfEmpty()
                                    select new BoxCommentDetails()
                                    {
                                        UserId = c.UserId,
                                        UserName = c.User == null ? null : $"{c?.User?.FirstName} {c?.User?.LastName}",
                                        CommentMessage = c.CommentText,
                                        Score = cr?.Score,
                                        Attitude = clr?.Attitude
                                    }
            };
        }
    }
}
