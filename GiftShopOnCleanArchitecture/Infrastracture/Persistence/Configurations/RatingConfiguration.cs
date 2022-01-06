using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Persistence.Configurations
{
    public class RatingConfiguration : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.HasKey(x => new { x.BoxId, x.UserId });
            builder.HasOne(r => r.User)
                .WithMany(u => u.BoxRatings)
                .HasForeignKey(r => r.UserId);
            builder.HasOne(r => r.Box)
                .WithMany(b => b.Ratings)
                .HasForeignKey(r => r.BoxId);
        }
    }
}
