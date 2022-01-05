using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Persistence.Configurations
{
    public class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder.HasKey(x => new { x.BoxId, x.UserId });
            builder.HasOne(c => c.User)
                .WithMany(u => u.CartList)
                .HasForeignKey(c => c.UserId);
            builder.HasOne(c => c.Box)
                .WithMany(b => b.Carts)
                .HasForeignKey(c => c.BoxId);
        }
    }
}
