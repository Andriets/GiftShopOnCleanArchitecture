using Application.Common.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Mapping
{
    public static class OrderMappingExtension
    {
        public static Order ToEntity(this OrderDTO orderDTO)
        {
            return new Order()
            {
                Id = orderDTO.Id,
                UserName = orderDTO.UserName,
                PhoneNumber = orderDTO.PhoneNumber,
                Region = orderDTO.Region,
                City = orderDTO.City,
                PostOffice = orderDTO.PostOffice,
                OrderDate = orderDTO.OrderDate,
                OrderStatus = orderDTO.OrderStatus,
                BoxOrders = orderDTO.BoxOrders
            };
        }

        public static OrderDTO ToDTO(this Order order)
        {
            return new OrderDTO()
            {
                Id = order.Id,
                UserName = order.UserName,
                PhoneNumber = order.PhoneNumber,
                Region = order.Region,
                City = order.City,
                PostOffice = order.PostOffice,
                OrderDate = order.OrderDate,
                OrderStatus = order.OrderStatus,
                UserId = order.UserId,
                User = new UserDTO()
                {
                    Id = order.User.Id,
                    FirstName = order.User.FirstName,
                    LastName = order.User.LastName,
                    Email = order.User.Email,
                    Region = order.User.Region,
                    City = order.User.City,
                    PostOffice = order.User.PostOffice,
                    Photo = order.User.Photo
                },
                BoxOrders = order.BoxOrders.Select(bo => new BoxOrder()
                {
                    BoxId = bo.BoxId,
                    Box = new Box()
                    {
                        Id = bo.Box.Id,
                        Title = bo.Box.Title,
                        Description = bo.Box.Description,
                        Price = bo.Box.Price,
                        Photo = bo.Box.Photo
                    },
                    OrderId = bo.OrderId
                })
            };
        }
    }
}
