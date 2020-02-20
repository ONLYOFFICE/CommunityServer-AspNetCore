/*
 *
 * (c) Copyright Ascensio System Limited 2010-2018
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html). 
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7 § 3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute. 
 * Pursuant to Section 7 § 3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/


//using System;
//using System.Collections.Generic;
//using System.Linq;
//using ASC.Common.Data;
//using ASC.Common.Data.Sql;
//using ASC.Mail.Core.Dao.Interfaces;
//using ASC.Mail.Core.DbSchema;
//using ASC.Mail.Core.DbSchema.Interfaces;
//using ASC.Mail.Core.DbSchema.Tables;
//using ASC.Mail.Core.Entities;

using System.Linq;
using ASC.Api.Core;
using ASC.Core;
using ASC.Core.Common.EF;
using ASC.Mail.Core.Dao.Entities;
using System.Collections.Generic;
using ASC.Mail.Core.Dao.Interfaces;
using ASC.Mail.Core.Entities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ASC.Mail.Core.Dao
{
    public class MailboxServerDao : BaseDao, IMailboxServerDao
    {
        public MailboxServerDao(ApiContext apiContext,
            SecurityContext securityContext,
            DbContextManager<MailDbContext> dbContext) 
            : base(apiContext, securityContext, dbContext)
        {
        }

        public MailboxServer GetServer(int id)
        {
            var server = MailDb.MailMailboxServer
                .Where(s => s.Id == id)
                .Select(ToMailboxServer)
                .FirstOrDefault();

            return server;
        }

        public List<MailboxServer> GetServers(int providerId, bool isUserData = false)
        {
            var servers = MailDb.MailMailboxServer
               .Where(s => s.IdProvider == providerId && s.IsUserData == isUserData)
               .Select(ToMailboxServer)
               .ToList();

            return servers;
        }

        public int SaveServer(MailboxServer mailboxServer)
        {
            var server = new MailMailboxServer
            {
                Id = mailboxServer.Id,
                IdProvider = mailboxServer.ProviderId,
                Type = mailboxServer.Type,
                Hostname = mailboxServer.Hostname,
                Port = mailboxServer.Port,
                SocketType = mailboxServer.SocketType,
                Username = mailboxServer.Username,
                Authentication = mailboxServer.Authentication,
                IsUserData = mailboxServer.IsUserData
            };

            var result = MailDb.MailMailboxServer.Add(server).Entity;

            MailDb.SaveChanges();

            return result.Id;
        }

        public int DeleteServer(int id)
        {
            var server = MailDb.MailMailboxServer
               .Where(s => s.Id == id)
               .First();


            var result = MailDb.MailMailboxServer.Remove(server);

            MailDb.SaveChanges();

            return result.State == Microsoft.EntityFrameworkCore.EntityState.Deleted ? id : -1;
        }

        protected MailboxServer ToMailboxServer(MailMailboxServer r)
        {
            var s = new MailboxServer
            {
                Id = r.Id,
                ProviderId = r.IdProvider,
                Type = r.Type,
                Hostname = r.Hostname,
                Port = r.Port,
                SocketType = r.SocketType,
                Username = r.Username,
                Authentication = r.Authentication,
                IsUserData = r.IsUserData
            };

            return s;
        }
    }

    public static class MailboxServerDaoExtension
    {
        public static IServiceCollection AddMailboxServerDaoService(this IServiceCollection services)
        {
            services.TryAddScoped<MailboxServer>();

            return services;
        }
    }
}