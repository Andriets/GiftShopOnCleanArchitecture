using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Persistence.Configurations
{
    public class BoxTagConfiguration : IEntityTypeConfiguration<BoxTag>
    {
        public void Configure(EntityTypeBuilder<BoxTag> builder)
        {
            builder.HasKey(x => new { x.TagId, x.BoxId });
            builder.HasOne(bt => bt.Box)
                .WithMany(b => b.BoxTag)
                .HasForeignKey(bt => bt.BoxId);
            builder.HasOne(bt => bt.Tag)
                .WithMany(b => b.BoxTag)
                .HasForeignKey(bt => bt.TagId);
        }
    }
}
