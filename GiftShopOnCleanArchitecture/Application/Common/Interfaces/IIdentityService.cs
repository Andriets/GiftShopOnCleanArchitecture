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

        Task<ApplicationUser> GetUserByIdAsync(string userId);

        Task<ApplicationUser> GetUserByUserNameAsync(string userName);

        Task AddToRoleAsync(ApplicationUser user, string role);

        Task<bool> IsInRoleAsync(string userId, string role);

        Task<IList<string>> GetUserRolesByUserNameAsync(string userName);

        Task<bool> AuthorizeAsync(string userName, string password);

        Task<Result> ChangePasswordAsync(string userId, string currPassword, string newPassword);

        Task<(Result Result, string UserId)> CreateUserAsync(ApplicationUser user, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}
