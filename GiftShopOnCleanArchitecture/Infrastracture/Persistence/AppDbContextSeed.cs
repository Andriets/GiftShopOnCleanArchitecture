using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.Persistence
{
    public class AppDbContextSeed
    {
        public static async Task SeedDefaultUsersAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {

            if (await roleManager.FindByNameAsync("SuperAdmin") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("SuperAdmin"));
            }

            if (await userManager.FindByNameAsync("superadmin@gmail.com") == null)
            {
                ApplicationUser admin = new ApplicationUser
                {
                    Email = "superadmin@gmail.com",
                    UserName = "superadmin@gmail.com"
                };
                IdentityResult result = await userManager.CreateAsync(admin, "1qaz1qaz");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "SuperAdmin");
                }
            }

            if (await roleManager.FindByNameAsync("Moderator") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("Moderator"));
            }

            if (await userManager.FindByNameAsync("moder@gmail.com") == null)
            {
                ApplicationUser moderator = new ApplicationUser
                {
                    Email = "moder@gmail.com",
                    UserName = "moder@gmail.com"
                };
                IdentityResult result = await userManager.CreateAsync(moderator, "1qaz1qaz");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(moderator, "Moderator");
                }
            }

            if (await roleManager.FindByNameAsync("User") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

            if (await userManager.FindByNameAsync("user@gmail.com") == null)
            {
                ApplicationUser user = new ApplicationUser
                {
                    Email = "user@gmail.com",
                    UserName = "user@gmail.com"
                };
                IdentityResult result = await userManager.CreateAsync(user, "1qaz1qaz");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "User");
                }
            }
        }
    }
}
