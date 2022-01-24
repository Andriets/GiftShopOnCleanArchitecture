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
        public static Box ToEntity(BoxDTO boxDTO)
        {
            return new Box()
            {
                Id = boxDTO.Id,
                Title = boxDTO.Title,
                Description = boxDTO.Description,
                Price = boxDTO.Price,
                Photo = boxDTO.Photo
            };
        }

        public static BoxDTO ToDTO(Box box)
        {
            return new BoxDTO()
            {
                Id = box.Id,
                Title = box.Title,
                Description = box.Description,
                Price = box.Price,
                Photo = box.Photo,
                UserBoxOrders = box.UserBoxOrders,
                Ratings = box.Ratings,
                Comments = box.Comments,
                Carts = box.Carts,
                Relationship = box.Relationship,
                BoxTag = box.BoxTag
            };
        }
    }
}
