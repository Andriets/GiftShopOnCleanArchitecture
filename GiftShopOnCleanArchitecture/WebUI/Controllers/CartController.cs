using Application.Carts.Commands.AddBoxToCart;
using Application.Carts.Commands.DeleteBoxFromCart;
using Application.Carts.Commands.UpdateQuantity;
using Application.Carts.Queries.GetCartByBoxesIds;
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
        public async Task<IActionResult> AddBoxToCart([FromBody] AddBoxToCartCommand addBoxToCartCommand)
        {
            try
            {
                var res = await _mediator.Send(addBoxToCartCommand);
                return Ok(new {success = res });
            }
            catch (GiftShopException)
            {
                return BadRequest(new { message = "Fail" });
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
                return BadRequest(new { message = "Fail" });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteBoxFromCart([FromBody] DeleteBoxFromCartCommand deleteBoxesFromCartCommand)
        {
            try
            {
                var res = await _mediator.Send(deleteBoxesFromCartCommand);
                return Ok(new { success = res });
            }
            catch (GiftShopException)
            {
                return BadRequest(new { message = "Fail" });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateQuantity([FromBody] UpdateQuantityCommand updateQuantityCommand)
        {
            try
            {
                var res = await _mediator.Send(updateQuantityCommand);
                return Ok(new { success = res });
            }
            catch (GiftShopException)
            {
                return BadRequest(new { message = "Fail" });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetCartsByBoxesIds([FromForm] GetCartsByBoxesIdsCommand getCartsByBoxesIdsCommand)
        {
            try
            {
                var res = await _mediator.Send(getCartsByBoxesIdsCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest(new { message = "Fail" });
            }
        }
    }
}
