using Application.Common.Models;
using Domain.Emuns;
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
            var allRelatedUsersIds = box.Comments?.Select(c => c.UserId).ToList()
                .Union(box.Ratings?.Select(r => r.UserId).ToList())
                .Union(box.Relationship?.Select(r => r.UserId).ToList()).ToList();

            return new BoxDTO()
            {
                Id = box.Id,
                Title = box.Title,
                Description = box.Description,
                Price = box.Price,
                PhotoBytes = box.Photo,
                Tags = box.BoxTag?.Select(bt => new TagDTO
                {
                    Id = bt.Tag.Id,
                    TagName = bt.Tag.TagName
                }),
                BoxCommentDetails = allRelatedUsersIds is null ? new List<BoxCommentDetails>() : 
                                    from uid in allRelatedUsersIds
                                    join c in box.Comments on uid equals c.UserId into firstJoin
                                    from comment in firstJoin.DefaultIfEmpty()
                                    join rel in box.Relationship on uid equals rel.UserId into secondJoin
                                    from relationship in secondJoin.DefaultIfEmpty()
                                    join r in box.Ratings on uid equals r.UserId into thirdJoin
                                    from rating in thirdJoin.DefaultIfEmpty()
                                    select new BoxCommentDetails()
                                    {
                                        UserId = uid,
                                        UserName = comment?.User == null ? null : $"{comment?.User?.FirstName} {comment?.User?.LastName}",
                                        CommentMessage = comment?.CommentText,
                                        Score = rating?.Score,
                                        Attitude = relationship?.Attitude ?? Attitude.None
                                    }
            };
        }
    }
}
