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
    public class HeartBeatConfig : IEntityTypeConfiguration<HeartBeat>
    {
        public void Configure(EntityTypeBuilder<HeartBeat> builder)
        {
            builder
                .ToTable("HeartBeat")
                .HasKey(t => t.Id);
            builder
                .Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();
            builder
                .Property(t => t.HeartBeatDate)
                .IsRequired()
                .HasColumnName("HeartBeatDate")
                .HasColumnType("datetime");
            builder
                .Property(t => t.Value)
                .IsRequired()
                .HasColumnName("Value")
                .HasColumnType("int");
        }
    }
}
