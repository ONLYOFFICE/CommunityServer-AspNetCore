﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASC.Mail.Core.Dao.Entities
{
    [Table("mail_server_server_type")]
    public partial class MailServerServerType
    {
        [Key]
        [Column("id", TypeName = "int(11)")]
        public int Id { get; set; }
        [Required]
        [Column("name", TypeName = "varchar(64)")]
        public string Name { get; set; }
    }

    public static class MailServerServerTypeExtension
    {
        public static ModelBuilder AddMailServerServerType(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MailServerServerType>(entity =>
            {
                entity.Property(e => e.Name)
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            return modelBuilder;
        }
    }
}