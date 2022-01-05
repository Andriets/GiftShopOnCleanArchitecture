using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Persistence.Configurations
{
    class UserBoxOrderConfiguration : IEntityTypeConfiguration<UserBoxOrder>
    {
        public void Configure(EntityTypeBuilder<UserBoxOrder> builder)
        {
            builder.HasKey(x => new { x.BoxId, x.OrderId, x.UserId });
            builder.HasOne(ubo => ubo.User)
                .WithMany(u => u.UserBoxOrders)
                .HasForeignKey(ubo => ubo.UserId);
            builder.HasOne(ubo => ubo.Box)
                .WithMany(b => b.UserBoxOrders)
                .HasForeignKey(ubo => ubo.BoxId);
            builder.HasOne(ubo => ubo.Order)
                .WithMany(o => o.UserBoxOrders)
                .HasForeignKey(ubo => ubo.OrderId);
        }
    }
}
