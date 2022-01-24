using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastracture.Persistence
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>, IAppDbContext
    {
        public DbSet<Box> Boxes { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Rating> Ratings { get; set; }

        public DbSet<UserBoxOrder> UserBoxOrder { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<BoxTag> BoxTag { get; set; }

        public DbSet<Relationship> Relationship { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
