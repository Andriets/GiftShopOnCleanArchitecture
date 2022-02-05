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
                Ratings = box.Ratings?.Select(r => new Rating 
                { 
                    BoxId = r.BoxId,
                    UserId = r.UserId,
                    Score = r.Score
                }),
                Comments = box.Comments?.Select(c => new Comment
                {
                    Id = c.Id,
                    BoxId = c.BoxId,
                    UserId= c.UserId,
                    CommentText = c.CommentText
                }),
                Relationship = box.Relationship?.Select(r => new Relationship
                {
                    UserId = r.UserId,
                    BoxId = r.BoxId,
                    Attitude = r.Attitude
                }),
                BoxTag = box.BoxTag?.Select(bt => new BoxTag
                {
                    BoxId = bt.BoxId,
                    Tag = new Tag
                    {
                        Id = bt.Tag.Id,
                        TagName = bt.Tag.TagName
                    }
                })
            };
        }
    }
}
