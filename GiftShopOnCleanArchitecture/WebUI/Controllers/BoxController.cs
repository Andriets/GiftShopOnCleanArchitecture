using Application.Boxes.Commands.CreateBox;
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
        public async Task<IActionResult> CreateBox(CreateBoxCommand createUserCommand)
        {
            try
            {
                var res = await _mediator.Send(createUserCommand);
                return Ok(res);
            } catch (GiftShopException)
            {
                return BadRequest("Fail");
            }

        }
    }
}
