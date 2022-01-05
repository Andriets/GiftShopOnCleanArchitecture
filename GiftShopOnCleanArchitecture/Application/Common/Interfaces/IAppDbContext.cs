using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<ApplicationUser> Users { get; set; }

        DbSet<Box> Boxes { get; set; }

        DbSet<Cart> Carts { get; set; }

        DbSet<Comment> Comments { get; set; }

        DbSet<Order> Orders { get; set; }

        DbSet<Photo> Photos { get; set; }

        DbSet<Rating> Ratings { get; set; }

        DbSet<UserBoxOrder> UserBoxOrder { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
