using Application.Tags.Commands.CreateTag;
using Application.Tags.Commands.DeleteTag;
using Application.Tags.Commands.UpdateTag;
using Application.Tags.Queries.GetAllTags;
using Domain.Exeptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : Controller
    {
        private readonly IMediator _mediator;

        public TagController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateTag(CreateTagCommand createTagCommand)
        {
            try
            {
                var res = await _mediator.Send(createTagCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetAllTags([FromQuery] GetAllTagsQuery getAllTagsQuery)
        {
            try
            {
                var res = _mediator.Send(getAllTagsQuery).Result;
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateTag(UpdateTagCommand updateTagCommand)
        {
            try
            {
                var res = await _mediator.Send(updateTagCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteTagById(DeleteTagCommand deleteTagCommand)
        {
            try
            {
                var res = await _mediator.Send(deleteTagCommand);
                return Ok(res);
            }
            catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }
    }
}
