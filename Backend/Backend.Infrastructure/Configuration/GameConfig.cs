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
    public class GameConfig : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder
                .ToTable("Training")
                .HasKey(t => t.Id);
            builder
                .Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();
            builder
                .Property(t => t.GameStartDate)
                .IsRequired()
                .HasColumnName("GameStartDate")
                .HasColumnType("date");
            builder
                .Property(t => t.GameEndDate)
                .IsRequired()
                .HasColumnName("GameEndDate")
                .HasColumnType("date");
            builder
                .Property(t => t.IsPlayerAbsent)
                .IsRequired()
                .HasColumnName("IsPlayerAbsent")
                .HasColumnType("bit");
            builder
                .Property(t => t.Description)
                .IsRequired()
                .HasColumnName("Description")
                .HasColumnType("varchar(500)");
        }
    }
}
