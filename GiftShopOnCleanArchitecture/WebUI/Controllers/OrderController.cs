using Application.Common.Models;
using Application.Orders.Queries.GetAllOrders;
using Application.Orders.Commands.CreateOrder;
using Domain.Exeptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Orders.Queries.GetOrderById;
using Application.Orders.Commands.UpdateOrderStatus;

namespace WebUI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateOrder(OrderDTO orderDTO)
        {
            try
            {
                var res = await _mediator.Send(new CreateOrderCommand() { Order = orderDTO});
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetAllOrders([FromQuery] GetAllOrdersQuery getAllOrdersQuery)
        {
            try
            {
                var res = _mediator.Send(getAllOrdersQuery).Result;
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetOrderById([FromQuery] GetOrderByIdQuery getOrderByIdQuery)
        {
            try
            {
                var res = _mediator.Send(getOrderByIdQuery).Result;
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateOrderStatus(UpdateOrderStatusCommand updateOrderStatusCommand)
        {
            try
            {
                var res = await _mediator.Send(updateOrderStatusCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }
    }
}
