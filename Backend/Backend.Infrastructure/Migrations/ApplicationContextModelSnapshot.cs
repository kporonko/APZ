﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Backend.Infrastructure.Data;

#nullable disable

namespace Backend.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend.Infrastructure.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("varchar(500)")
                        .HasColumnName("Description");

                    b.Property<DateTime>("GameEndDate")
                        .HasColumnType("date")
                        .HasColumnName("GameEndDate");

                    b.Property<DateTime>("GameStartDate")
                        .HasColumnType("date")
                        .HasColumnName("GameStartDate");

                    b.Property<bool>("IsPlayerAbsent")
                        .HasColumnType("bit")
                        .HasColumnName("IsPlayerAbsent");

                    b.Property<int>("PlayerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlayerId");

                    b.ToTable("Game", (string)null);
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.HeartBeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<DateTime>("HeartBeatDate")
                        .HasColumnType("date")
                        .HasColumnName("HeartBeatDate");

                    b.Property<int>("Value")
                        .HasColumnType("int")
                        .HasColumnName("Value");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("HeartBeat", (string)null);
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.ManagerProfile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar")
                        .HasColumnName("FirstName");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar")
                        .HasColumnName("LastName");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar")
                        .HasColumnName("Login");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(max)")
                        .HasColumnName("Password");

                    b.HasKey("Id");

                    b.ToTable("ManagerProfile", (string)null);
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Avatar")
                        .HasColumnType("varchar(max)")
                        .HasColumnName("Avatar");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("date")
                        .HasColumnName("BirthDate");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar")
                        .HasColumnName("FirstName");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar")
                        .HasColumnName("LastName");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar")
                        .HasColumnName("Login");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(max)")
                        .HasColumnName("Password");

                    b.Property<int>("TeamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Player", (string)null);
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("varchar(200)")
                        .HasColumnName("Description");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("varchar(max)")
                        .HasColumnName("Image");

                    b.Property<int>("ManagerId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.HasIndex("ManagerId")
                        .IsUnique();

                    b.ToTable("Team", (string)null);
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Game", b =>
                {
                    b.HasOne("Backend.Infrastructure.Models.Player", "Player")
                        .WithMany("Games")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Player");
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.HeartBeat", b =>
                {
                    b.HasOne("Backend.Infrastructure.Models.Game", "Game")
                        .WithMany("HeartBeats")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Game");
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Player", b =>
                {
                    b.HasOne("Backend.Infrastructure.Models.Team", "Team")
                        .WithMany("Players")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Team", b =>
                {
                    b.HasOne("Backend.Infrastructure.Models.ManagerProfile", "ManagerProfile")
                        .WithOne("Team")
                        .HasForeignKey("Backend.Infrastructure.Models.Team", "ManagerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ManagerProfile");
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Game", b =>
                {
                    b.Navigation("HeartBeats");
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.ManagerProfile", b =>
                {
                    b.Navigation("Team")
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Player", b =>
                {
                    b.Navigation("Games");
                });

            modelBuilder.Entity("Backend.Infrastructure.Models.Team", b =>
                {
                    b.Navigation("Players");
                });
#pragma warning restore 612, 618
        }
    }
}
