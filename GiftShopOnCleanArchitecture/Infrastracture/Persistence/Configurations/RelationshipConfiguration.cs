using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Persistence.Configurations
{
    public class RelationshipConfiguration : IEntityTypeConfiguration<Relationship>
    {
        public void Configure(EntityTypeBuilder<Relationship> builder)
        {
            builder.HasKey(x => new { x.UserId, x.BoxId });
            builder.HasOne(r => r.User)
                .WithMany(u => u.Relationship)
                .HasForeignKey(r => r.UserId);
            builder.HasOne(r => r.Box)
                .WithMany(b => b.Relationship)
                .HasForeignKey(r => r.BoxId);
        }
    }
}
