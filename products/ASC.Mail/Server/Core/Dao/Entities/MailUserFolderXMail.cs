﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using ASC.Core.Common.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASC.Mail.Core.Dao.Entities
{
    [Table("mail_user_folder_x_mail")]
    public partial class MailUserFolderXMail : BaseEntity
    {
        [Key]
        [Column("tenant", TypeName = "int(11)")]
        public int Tenant { get; set; }
        
        [Key]
        [Column("id_user", TypeName = "varchar(38)")]
        public string IdUser { get; set; }
        
        [Key]
        [Column("id_mail", TypeName = "int(11) unsigned")]
        public uint IdMail { get; set; }
        
        [Key]
        [Column("id_folder", TypeName = "int(11) unsigned")]
        public int IdFolder { get; set; }
        [Column("time_created", TypeName = "timestamp")]
        public DateTime TimeCreated { get; set; }

        public override object[] GetKeys()
        {
            return new object[] { Tenant, IdUser, IdMail };
        }
    }

    public static class MailUserFolderXMailExtension
    {
        public static ModelBuilder AddMailUserFolderXMail(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MailUserFolderXMail>(entity =>
            {
                entity.HasKey(e => new { e.Tenant, e.IdUser, e.IdMail, e.IdFolder })
                    .HasName("PRIMARY");

                entity.HasIndex(e => e.IdFolder)
                    .HasName("id_tag");

                entity.HasIndex(e => e.IdMail)
                    .HasName("id_mail");

                entity.Property(e => e.IdUser)
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.TimeCreated)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .ValueGeneratedOnAddOrUpdate();
            });

            return modelBuilder;
        }
    }
}