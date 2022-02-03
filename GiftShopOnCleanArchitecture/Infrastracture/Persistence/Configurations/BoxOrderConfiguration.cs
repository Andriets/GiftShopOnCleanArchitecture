using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Persistence.Configurations
{
    class BoxOrderConfiguration : IEntityTypeConfiguration<BoxOrder>
    {
        public void Configure(EntityTypeBuilder<BoxOrder> builder)
        {
            builder.HasKey(x => new { x.BoxId, x.OrderId});
            builder.HasOne(ubo => ubo.Box)
                .WithMany(b => b.BoxOrders)
                .HasForeignKey(ubo => ubo.BoxId);
            builder.HasOne(ubo => ubo.Order)
                .WithMany(o => o.BoxOrders)
                .HasForeignKey(ubo => ubo.OrderId);
        }
    }
}
