using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Infrastructure.Models;

namespace Backend.Infrastructure.Configuration
{
    public class ManagerProfileConfig : IEntityTypeConfiguration<ManagerProfile>
    {
        public void Configure(EntityTypeBuilder<Coach> builder)
        {
            builder
                .ToTable("Coach")
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
                .Property(t => t.Avatar)
                .IsRequired(true)
                .HasColumnName("Avatar")
                .HasColumnType("varchar(max)");
            builder
                .Property(t => t.BirthDate)
                .IsRequired(true)
                .HasColumnName("BirthDate")
                .HasColumnType("date");
            builder
                .Property(t => t.Login)
                .IsRequired(true)
                .HasColumnName("Login")
                .HasColumnType("varchar")
                .HasMaxLength(100);
        }
    }
