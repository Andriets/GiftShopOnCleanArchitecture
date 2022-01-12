using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.Services
{
    public class TokenService : ITokenService
    {
        private readonly IOptions<JwtOptionsModel> _jwtOptions;

        public TokenService(IOptions<JwtOptionsModel> opt)
        {
            _jwtOptions = opt;
        }

        public string GenerateAccessToken(UserDTO user)
        {
            var lifeTime = _jwtOptions.Value.LifeTime;
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
            };

            var secretBytes = Encoding.UTF8.GetBytes(_jwtOptions.Value.SecretKey);
            var key = new SymmetricSecurityKey(secretBytes);
            var algorithm = SecurityAlgorithms.HmacSha256;

            var jwtToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddSeconds(lifeTime),
                signingCredentials: new SigningCredentials(key, algorithm)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
    }
}
