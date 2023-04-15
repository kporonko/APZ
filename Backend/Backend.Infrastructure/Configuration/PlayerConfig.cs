using Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Configuration
{
    public class PlayerConfig : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder
                .ToTable("Player")
                .HasKey(t => t.Id);
            builder
                .Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();
            builder
                .Property(t => t.LastName)
                .IsRequired()
                .HasColumnName("LastName")
                .HasColumnType("varchar")
                .HasMaxLength(50);
            builder
                .Property(t => t.FirstName)
                .IsRequired()
                .HasColumnName("FirstName")
                .HasColumnType("varchar")
                .HasMaxLength(50);
            builder
                .Property(t => t.Avatar)
                .IsRequired(false)
                .HasColumnName("Avatar")
                .HasColumnType("varchar(max)");
            builder
                .Property(t => t.BirthDate)
                .IsRequired()
                .HasColumnName("BirthDate")
                .HasColumnType("date");

            builder
                .Property(t => t.Password)
                .IsRequired(true)
                .HasColumnName("Password")
                .HasColumnType("varchar(max)");
            builder
                .Property(t => t.Login)
                .IsRequired(true)
                .HasColumnName("Login")
                .HasColumnType("varchar")
                .HasMaxLength(100);
        }
    }
}
