using Application.Boxes.Commands.CreateBox;
using Application.Boxes.Commands.DeleteBox;
using Application.Boxes.Commands.UpdateBox;
using Application.Boxes.Queries.GetAllBoxes;
using Application.Boxes.Queries.GetBoxById;
using Domain.Exeptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BoxController : Controller
    {
        private readonly IMediator _mediator;

        public BoxController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateBox([FromForm] CreateBoxCommand createUserCommand)
        {
            try
            {
                var res = await _mediator.Send(createUserCommand);
                return Ok(new { id = res });
            } catch (GiftShopException)
            {
                return BadRequest(new { error = "Fail" });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateBox([FromForm] UpdateBoxCommand createBoxCommand)
        {
            try
            {
                var res = await _mediator.Send(createBoxCommand);
                return Ok(new { id = res });
            }
            catch (GiftShopException)
            {
                return BadRequest(new { error = "Fail" });
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetAllBoxes([FromQuery] GetAllBoxesQuery getAllBoxesQuery)
        {
            try
            {
                var res = _mediator.Send(getAllBoxesQuery).Result;
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetBoxById([FromQuery] GetBoxByIdQuery getBoxByIdQuery)
        {
            try
            {
                var res = _mediator.Send(getBoxByIdQuery).Result;
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteBoxById(DeleteBoxCommand deleteBoxCommand)
        {
            try
            {
                var res = await _mediator.Send(deleteBoxCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }
    }
}
