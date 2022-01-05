using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastracture.Persistence.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasOne(c => c.User)
                .WithMany(u => u.BoxComments)
                .HasForeignKey(c => c.UserId);
            builder.HasOne(c => c.Box)
                .WithMany(b => b.Comments)
                .HasForeignKey(c => c.BoxId);
        }
    }
}
