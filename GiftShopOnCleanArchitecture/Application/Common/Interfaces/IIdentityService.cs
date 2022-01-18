using Application.Common.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);

        Task AddToRoleAsync(ApplicationUser user, string role);

        Task<bool> IsInRoleAsync(string userId, string role);

        Task<bool> AuthorizeAsync(string userName, string password);

        Task<(Result Result, string UserId)> CreateUserAsync(ApplicationUser user, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}
