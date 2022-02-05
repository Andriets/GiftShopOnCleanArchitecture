using Application.Carts.Commands.AddBoxToCart;
using Application.Carts.Commands.DeleteBoxesFromCart;
using Application.Carts.Queries.GetUserCart;
using Domain.Exeptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly IMediator _mediator;

        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddBoxToCart(AddBoxToCartCommand addBoxToCartCommand)
        {
            try
            {
                var res = await _mediator.Send(addBoxToCartCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetUserCart([FromQuery] GetUserCartQuery getUserCartQuery)
        {
            try
            {
                var res = _mediator.Send(getUserCartQuery).Result;
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteBoxesFromCart(DeleteBoxesFromCartCommand deleteBoxesFromCartCommand)
        {
            try
            {
                var res = await _mediator.Send(deleteBoxesFromCartCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }
    }
}
