using Application.Common.Models;
using Application.User.Commands.AuthorizeUser;
using Application.User.Commands.ChangePassword;
using Application.User.Commands.CreateUser;
using Application.User.Commands.UpdateUserRole;
using Application.User.Queries.GetAllUsers;
using Application.User.Queries.GetUserById;
using Application.Users.Commands.UpdateUserInfo;
using Application.Users.Commands.UpdateUserPhoto;
using Domain.Exeptions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateUser(UserDTO user)
        {
            var res = await _mediator.Send(new CreateUserCommand() { User = user });
            return string.IsNullOrEmpty(res) ? BadRequest("") : Ok(new { UserId = res });
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserByIdAsync([FromQuery] GetUserByIdQuery getUserByIdQuery)
        {
            var res = await _mediator.Send(getUserByIdQuery);
            return Ok(res);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetAllAsync([FromBody] GetAllUsersQuery getAllUsersQuery)
        {
            try
            {
                var res = await _mediator.Send(getAllUsersQuery);
                return Ok(res);
            }
            catch (GiftShopException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateUserPhotoAsync([FromForm] UpdateUserPhotoCommand updateUserPhotoCommand)
        {
            try
            {
                var res = await _mediator.Send(updateUserPhotoCommand);
                return Ok(res);
            } catch (GiftShopException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateUserRoleAsync([FromBody] UpdateUserRoleCommand updateUserRoleCommand)
        {
            try
            {
                var res = await _mediator.Send(updateUserRoleCommand);
                return Ok(new { Success = res });
            }
            catch (GiftShopException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SignInAsync(UserDTO user)
        {
            try
            {
                var res = await _mediator.Send(new AuthorizeUserCommand() { UserName = user.Email, Password = user.Password });
                return Ok(res);
            } catch (GiftShopException)
            {
                return BadRequest("Fail");
            }
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("[action]")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordCommand changePasswordCommand)
        {
            try
            {
                await _mediator.Send(changePasswordCommand);
                return Ok("");
            } catch (GiftShopException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateUserInfoAsync(UpdateUserInfoCommand updateUserInfoCommand)
        {
            try
            {
                var res = await _mediator.Send(updateUserInfoCommand);
                return Ok(res);
            }
            catch (GiftShopException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
