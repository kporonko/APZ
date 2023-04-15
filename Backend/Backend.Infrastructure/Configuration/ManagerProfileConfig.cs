using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Backend.Infrastructure.Models;

namespace Backend.Infrastructure.Configuration
{
    public class ManagerProfileConfig : IEntityTypeConfiguration<ManagerProfile>
    {
        public void Configure(EntityTypeBuilder<ManagerProfile> builder)
        {
            builder
                .ToTable("ManagerProfile")
                .HasKey(t => t.Id);
            builder
                .Property(t => t.Id)
                .IsRequired(true)
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();
            builder
                .Property(t => t.LastName)
                .IsRequired(true)
                .HasColumnName("LastName")
                .HasColumnType("varchar")
                .HasMaxLength(50);
            builder
                .Property(t => t.FirstName)
                .IsRequired(true)
                .HasColumnName("FirstName")
                .HasColumnType("varchar")
                .HasMaxLength(50);
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