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


using System.Collections.Generic;
using System.Linq;
using ASC.Api.Core;
using ASC.Core;
using ASC.Core.Common.EF;
using ASC.Mail.Core.Dao.Entities;
using ASC.Mail.Core.Dao.Interfaces;

namespace ASC.Mail.Core.Dao
{
    public class TagAddressDao: BaseDao, ITagAddressDao
    {
        public TagAddressDao(ApiContext apiContext,
            SecurityContext securityContext,
            DbContextManager<MailDbContext> dbContext)
            : base(apiContext, securityContext, dbContext)
        {
        }

        public List<int> GetTagIds(string email)
        {
            var tagIds = MailDb.MailTagAddresses
                .Join(MailDb.MailTag, ta => (int)ta.IdTag, t => t.Id,
                (ta, t) => new
                {
                    TagAddress = ta,
                    Tag = t
                })
                .Where(o => o.TagAddress.Address == email)
                .Where(o => o.Tag.Tenant == Tenant && o.Tag.IdUser == UserId)
                .Select(o => (int)o.TagAddress.IdTag)
                .Distinct()
                .ToList();

            return tagIds;
        }

        public List<string> GetTagAddresses(int tagId)
        {
            var list = MailDb.MailTagAddresses
                .Where(a => a.IdTag == tagId && a.Tenant == Tenant)
                .Select(a => a.Address)
                .ToList();

            return list;
        }

        public int Save(int tagId, string email)
        {
            var mailTagAddress = new MailTagAddresses
            {
                IdTag = (uint)tagId,
                Address = email,
                Tenant = Tenant
            };

            MailDb.AddOrUpdate(t => t.MailTagAddresses, mailTagAddress);

            var result = MailDb.SaveChanges();

            return result;
        }

        public int Delete(int tagId, string email = null)
        {
            var queryDelete = MailDb.MailTagAddresses.Where(a => a.IdTag == tagId && a.Tenant == Tenant);

            if (!string.IsNullOrEmpty(email))
            {
                queryDelete.Where(a => a.Address == email);
            }

            MailDb.MailTagAddresses.RemoveRange(queryDelete);

            var result = MailDb.SaveChanges();

            return result;
        }

        public int DeleteAll()
        {
            var queryDelete = MailDb.MailTagAddresses.Where(a => a.Tenant == Tenant);

            MailDb.MailTagAddresses.RemoveRange(queryDelete);

            var result = MailDb.SaveChanges();

            return result;
        }
    }
}