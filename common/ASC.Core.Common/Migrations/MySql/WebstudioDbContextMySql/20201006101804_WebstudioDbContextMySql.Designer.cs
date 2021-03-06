﻿// <auto-generated />
using System;
using ASC.Core.Common.EF.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ASC.Core.Common.Migrations.MySql.WebstudioDbContextMySql
{
    [DbContext(typeof(MySqlWebstudioDbContext))]
    [Migration("20201006101804_WebstudioDbContextMySql")]
    partial class WebstudioDbContextMySql
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbWebstudioIndex", b =>
                {
                    b.Property<string>("IndexName")
                        .HasColumnName("index_name")
                        .HasColumnType("varchar(50)")
                        .HasAnnotation("MySql:CharSet", "utf8")
                        .HasAnnotation("MySql:Collation", "utf8_general_ci");

                    b.Property<DateTime>("LastModified")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("last_modified")
                        .HasColumnType("timestamp")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("IndexName")
                        .HasName("PRIMARY");

                    b.ToTable("webstudio_index");
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbWebstudioSettings", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnName("TenantID")
                        .HasColumnType("int");

                    b.Property<string>("Id")
                        .HasColumnName("ID")
                        .HasColumnType("varchar(64)")
                        .HasAnnotation("MySql:CharSet", "utf8")
                        .HasAnnotation("MySql:Collation", "utf8_general_ci");

                    b.Property<string>("UserId")
                        .HasColumnName("UserID")
                        .HasColumnType("varchar(64)")
                        .HasAnnotation("MySql:CharSet", "utf8")
                        .HasAnnotation("MySql:Collation", "utf8_general_ci");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("mediumtext")
                        .HasAnnotation("MySql:CharSet", "utf8")
                        .HasAnnotation("MySql:Collation", "utf8_general_ci");

                    b.HasKey("TenantId", "Id", "UserId")
                        .HasName("PRIMARY");

                    b.HasIndex("Id")
                        .HasName("ID");

                    b.ToTable("webstudio_settings");

                    b.HasData(
                        new
                        {
                            TenantId = 1,
                            Id = "9a925891-1f92-4ed7-b277-d6f649739f06",
                            UserId = "00000000-0000-0000-0000-000000000000",
                            Data = "{\"Completed\":false}"
                        });
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbWebstudioUserVisit", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnName("tenantid")
                        .HasColumnType("int");

                    b.Property<DateTime>("VisitDate")
                        .HasColumnName("visitdate")
                        .HasColumnType("datetime");

                    b.Property<string>("ProductId")
                        .HasColumnName("productid")
                        .HasColumnType("varchar(38)")
                        .HasAnnotation("MySql:CharSet", "utf8")
                        .HasAnnotation("MySql:Collation", "utf8_general_ci");

                    b.Property<string>("UserId")
                        .HasColumnName("userid")
                        .HasColumnType("varchar(38)")
                        .HasAnnotation("MySql:CharSet", "utf8")
                        .HasAnnotation("MySql:Collation", "utf8_general_ci");

                    b.Property<DateTime>("FirstVisitTime")
                        .HasColumnName("firstvisittime")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("LastVisitTime")
                        .HasColumnName("lastvisittime")
                        .HasColumnType("datetime");

                    b.Property<int>("VisitCount")
                        .HasColumnName("visitcount")
                        .HasColumnType("int");

                    b.HasKey("TenantId", "VisitDate", "ProductId", "UserId")
                        .HasName("PRIMARY");

                    b.HasIndex("VisitDate")
                        .HasName("visitdate");

                    b.ToTable("webstudio_uservisit");

                    b.HasData(
                        new
                        {
                            TenantId = 1,
                            VisitDate = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(1620),
                            ProductId = "00000000-0000-0000-0000-000000000000",
                            UserId = "66faa6e4-f133-11ea-b126-00ffeec8b4ef",
                            FirstVisitTime = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(4248),
                            LastVisitTime = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(4835),
                            VisitCount = 3
                        },
                        new
                        {
                            TenantId = 1,
                            VisitDate = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(5443),
                            ProductId = "00000000-0000-0000-0000-000000000000",
                            UserId = "66faa6e4-f133-11ea-b126-00ffeec8b4ef",
                            FirstVisitTime = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(5501),
                            LastVisitTime = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(5509),
                            VisitCount = 2
                        },
                        new
                        {
                            TenantId = 1,
                            VisitDate = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(5519),
                            ProductId = "e67be73d-f9ae-4ce1-8fec-1880cb518cb4",
                            UserId = "66faa6e4-f133-11ea-b126-00ffeec8b4ef",
                            FirstVisitTime = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(5525),
                            LastVisitTime = new DateTime(2020, 10, 6, 10, 18, 4, 448, DateTimeKind.Utc).AddTicks(5526),
                            VisitCount = 1
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
