﻿using Application.Common.Models;
using Application.User.Commands.AuthorizeUser;
using Application.User.Commands.ChangePassword;
using Application.User.Commands.CreateUser;
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
            return string.IsNullOrEmpty(res) ? BadRequest("") : Ok(res);
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
                return Ok();
            } catch (GiftShopException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}