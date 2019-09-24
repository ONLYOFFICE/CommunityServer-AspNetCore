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


using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

using ASC.Common.Data.Sql;
using ASC.Common.Data.Sql.Expressions;
using ASC.Core.Tenants;
using ASC.Core.Users;
using ASC.Security.Cryptography;

namespace ASC.Core.Data
{
    public class DbUserService : DbBaseService, IUserService
    {
        public DbUserService(ConnectionStringSettings connectionString)
            : base(connectionString, "tenant")
        {
        }

        public IDictionary<Guid, UserInfo> GetUsers(int tenant, DateTime from)
        {
            var q = GetUserQuery(tenant, from);
            return ExecList(q).ConvertAll(ToUser).ToDictionary(u => u.ID);
        }

        public List<UserInfo> GetUsers(int tenant, bool isAdmin,
            EmployeeStatus? employeeStatus,
            List<List<Guid>> includeGroups,
            List<Guid> excludeGroups,
            EmployeeActivationStatus? activationStatus,
            string text,
            string sortBy,
            bool sortOrderAsc,
            long limit,
            long offset,
            out int total)
        {
            var totalQuery = new SqlQuery("core_user u").Where("u.tenant", tenant).SelectCount();
            GetUserQueryForFilter(totalQuery, isAdmin, employeeStatus, includeGroups, excludeGroups, activationStatus, text);
            total = ExecScalar<int>(totalQuery);

            var q = GetUserQuery(tenant, default);

            q = GetUserQueryForFilter(q, isAdmin, employeeStatus, includeGroups, excludeGroups, activationStatus, text);

            if (!string.IsNullOrEmpty(sortBy))
            {
                q.OrderBy(sortBy, sortOrderAsc);
            }

            if (limit != 0)
            {
                q.SetMaxResults((int)limit);
            }

            if (offset != 0)
            {
                q.SetFirstResult((int)offset);
            }

            return GetDb().ExecuteList(q, ToUser);
        }

        private SqlQuery GetUserQueryForFilter(SqlQuery q, bool isAdmin,
            EmployeeStatus? employeeStatus,
            List<List<Guid>> includeGroups,
            List<Guid> excludeGroups,
            EmployeeActivationStatus? activationStatus,
            string text)
        {
            q.Where("u.removed", false);

            if (includeGroups != null && includeGroups.Any())
            {
                var groupQuery = new SqlQuery("core_usergroup cug")
                    .Select("cug.userid")
                    .Where(Exp.EqColumns("cug.tenant", "u.tenant"))
                    .Where(Exp.EqColumns("u.id", "cug.userid"))
                    .Where("cug.removed", false);

                foreach (var groups in includeGroups)
                {
                    var subQuery = Exp.Empty;

                    foreach (var g in groups)
                    {
                        subQuery |= Exp.Eq("cug.groupid", g);
                    }

                    groupQuery.Where(subQuery);
                }

                q.Where(Exp.Exists(groupQuery));
            }

            if (excludeGroups != null && excludeGroups.Any())
            {
                foreach (var g in excludeGroups)
                {
                    var groupQuery = new SqlQuery("core_usergroup cug")
                        .Select("cug.userid")
                        .Where(Exp.EqColumns("cug.tenant", "u.tenant"))
                        .Where(Exp.EqColumns("u.id", "cug.userid"))
                        .Where(Exp.Eq("cug.groupid", g));
                    q.Where(!Exp.Exists(groupQuery));
                }
            }

            if (!isAdmin && employeeStatus == null)
            {
                q.Where(!Exp.Eq("u.status", EmployeeStatus.Terminated));
            }

            if (employeeStatus != null)
            {
                switch (employeeStatus)
                {
                    case EmployeeStatus.LeaveOfAbsence:
                    case EmployeeStatus.Terminated:
                        if (isAdmin)
                        {
                            q.Where("u.status", EmployeeStatus.Terminated);
                        }
                        else
                        {
                            q.Where(Exp.False);
                        }
                        break;
                    case EmployeeStatus.All:
                        if (!isAdmin) q.Where(!Exp.Eq("u.status", EmployeeStatus.Terminated));
                        break;
                    case EmployeeStatus.Default:
                    case EmployeeStatus.Active:
                        q.Where("u.status", EmployeeStatus.Active);
                        break;
                }
            }

            if (activationStatus != null)
            {
                q.Where("u.activation_status", activationStatus.Value);
            }

            if (!string.IsNullOrEmpty(text))
            {
                q.Where(Exp.Like("u.firstname", text, SqlLike.AnyWhere) |
                    Exp.Like("u.lastname", text, SqlLike.AnyWhere) |
                    Exp.Like("u.title", text, SqlLike.AnyWhere) |
                    Exp.Like("u.location", text, SqlLike.AnyWhere) |
                    Exp.Like("u.email", text, SqlLike.AnyWhere));
            }

            return q;
        }

        public UserInfo GetUser(int tenant, Guid id)
        {
            var q = GetUserQuery(tenant, default).Where("id", id);
            return ExecList(q).ConvertAll(ToUser).SingleOrDefault();
        }

        public UserInfo GetUser(int tenant, string login, string passwordHash)
        {
            if (string.IsNullOrEmpty(login)) throw new ArgumentNullException("login");

            var q = GetUserQuery()
                .InnerJoin("core_usersecurity s", Exp.EqColumns("u.id", "s.userid"))
                .Where(login.Contains('@') ? "u.email" : "u.id", login)
                .Where("s.pwdhash", passwordHash)
                .Where("removed", false);
            if (tenant != Tenant.DEFAULT_TENANT)
            {
                q.Where("u.tenant", tenant);
            }

            return ExecList(q).ConvertAll(ToUser).FirstOrDefault();
        }

        public UserInfo SaveUser(int tenant, UserInfo user)
        {
            if (user == null) throw new ArgumentNullException("user");
            if (string.IsNullOrEmpty(user.UserName)) throw new ArgumentOutOfRangeException("Empty username.");

            if (user.ID == default) user.ID = Guid.NewGuid();
            if (user.CreateDate == default) user.CreateDate = DateTime.UtcNow;
            user.LastModified = DateTime.UtcNow;
            user.Tenant = tenant;

            using (var db = GetDb())
            using (var tx = db.BeginTransaction())
            {
                user.UserName = user.UserName.Trim();
                var q = Query("core_user", tenant)
                    .SelectCount()
                    .Where("username", user.UserName)
                    .Where(!Exp.Eq("id", user.ID.ToString()))
                    .Where("removed", false);
                var count = db.ExecuteScalar<int>(q);
                if (count != 0)
                {
                    throw new ArgumentOutOfRangeException("Duplicate username.");
                }

                user.Email = user.Email.Trim();
                q = Query("core_user", tenant)
                    .SelectCount()
                    .Where("email", user.Email)
                    .Where(!Exp.Eq("id", user.ID.ToString()))
                    .Where("removed", false);
                count = db.ExecuteScalar<int>(q);
                if (count != 0)
                {
                    throw new ArgumentOutOfRangeException("Duplicate email.");
                }

                var i = Insert("core_user", tenant)
                    .InColumnValue("id", user.ID.ToString())
                    .InColumnValue("username", user.UserName)
                    .InColumnValue("firstname", user.FirstName)
                    .InColumnValue("lastname", user.LastName)
                    .InColumnValue("sex", user.Sex)
                    .InColumnValue("bithdate", user.BirthDate)
                    .InColumnValue("status", user.Status)
                    .InColumnValue("title", user.Title)
                    .InColumnValue("workfromdate", user.WorkFromDate)
                    .InColumnValue("terminateddate", user.TerminatedDate)
                    .InColumnValue("contacts", user.ContactsToString())
                    .InColumnValue("email", string.IsNullOrEmpty(user.Email) ? user.Email : user.Email.Trim())
                    .InColumnValue("location", user.Location)
                    .InColumnValue("notes", user.Notes)
                    .InColumnValue("removed", user.Removed)
                    .InColumnValue("last_modified", user.LastModified)
                    .InColumnValue("activation_status", user.ActivationStatus)
                    .InColumnValue("culture", user.CultureName)
                    .InColumnValue("phone", user.MobilePhone)
                    .InColumnValue("phone_activation", user.MobilePhoneActivationStatus)
                    .InColumnValue("sid", user.Sid)
                    .InColumnValue("sso_name_id", user.SsoNameId)
                    .InColumnValue("sso_session_id", user.SsoSessionId)
                    .InColumnValue("create_on", user.CreateDate);

                db.ExecuteNonQuery(i);

                tx.Commit();
            }

            return user;
        }

        public void RemoveUser(int tenant, Guid id)
        {
            RemoveUser(tenant, id, false);
        }

        public void RemoveUser(int tenant, Guid id, bool immediate)
        {
            var stringId = id.ToString();
            var batch = new List<ISqlInstruction>
                {
                    Delete("core_acl", tenant).Where("subject", stringId),
                    Delete("core_subscription", tenant).Where("recipient", stringId),
                    Delete("core_subscriptionmethod", tenant).Where("recipient", stringId),
                    Delete("core_userphoto", tenant).Where("userid", stringId)
                };

            if (immediate)
            {
                batch.Add(Delete("core_usergroup", tenant).Where("userid", stringId));
                batch.Add(Delete("core_user", tenant).Where("id", stringId));
                batch.Add(Delete("core_usersecurity", tenant).Where("userid", stringId));
            }
            else
            {
                batch.Add(Update("core_usergroup", tenant).Set("removed", true).Set("last_modified", DateTime.UtcNow).Where("userid", stringId));
                batch.Add(Update("core_user", tenant)
                              .Set("removed", true)
                              .Set("status", (int)EmployeeStatus.Terminated)
                              .Set("terminateddate", DateTime.UtcNow)
                              .Set("last_modified", DateTime.UtcNow)
                              .Where("id", stringId));
            }
            ExecBatch(batch);
        }

        public void SetUserPhoto(int tenant, Guid id, byte[] photo)
        {
            var sql = photo != null && photo.Length != 0 ?
                          Insert("core_userphoto", tenant).InColumns("userid", "photo").Values(id.ToString(), photo) :
                          (ISqlInstruction)Delete("core_userphoto", tenant).Where("userid", id.ToString());

            ExecNonQuery(sql);
        }

        public byte[] GetUserPhoto(int tenant, Guid id)
        {
            var photo = ExecScalar<byte[]>(Query("core_userphoto", tenant).Select("photo").Where("userid", id.ToString()));
            return photo ?? new byte[0];
        }

        public string GetUserPassword(int tenant, Guid id)
        {
            var q = Query("core_usersecurity", tenant).Select("pwdhashsha512").Where("userid", id.ToString());
            var h2 = ExecScalar<string>(q);
            return !string.IsNullOrEmpty(h2) ? Crypto.GetV(h2, 1, false) : null;
        }

        public void SetUserPassword(int tenant, Guid id, string password)
        {
            var h1 = !string.IsNullOrEmpty(password) ? Hasher.Base64Hash(password, HashAlg.SHA256) : null;
            var h2 = !string.IsNullOrEmpty(password) ? Crypto.GetV(password, 1, true) : null;
            var i = Insert("core_usersecurity", tenant)
                .InColumnValue("userid", id.ToString())
                .InColumnValue("pwdhash", h1)
                .InColumnValue("pwdhashsha512", h2);
            ExecNonQuery(i);
        }

        public IDictionary<Guid, Group> GetGroups(int tenant, DateTime from)
        {
            var q = GetGroupQuery(tenant, from);
            return ExecList(q)
                .ConvertAll(ToGroup)
                .ToDictionary(g => g.Id);
        }

        public Group GetGroup(int tenant, Guid id)
        {
            var q = GetGroupQuery(tenant, default).Where("id", id);
            return ExecList(q).ConvertAll(ToGroup).SingleOrDefault();
        }

        public Group SaveGroup(int tenant, Group group)
        {
            if (group == null) throw new ArgumentNullException("user");

            if (group.Id == default) group.Id = Guid.NewGuid();
            group.LastModified = DateTime.UtcNow;
            group.Tenant = tenant;

            var i = Insert("core_group", tenant)
                .InColumnValue("id", group.Id.ToString())
                .InColumnValue("name", group.Name)
                .InColumnValue("parentid", group.ParentId.ToString())
                .InColumnValue("categoryid", group.CategoryId.ToString())
                .InColumnValue("removed", group.Removed)
                .InColumnValue("last_modified", group.LastModified)
                .InColumnValue("sid", group.Sid);
            ExecNonQuery(i);
            return group;
        }

        public void RemoveGroup(int tenant, Guid id)
        {
            RemoveGroup(tenant, id, false);
        }

        public void RemoveGroup(int tenant, Guid id, bool immediate)
        {
            var batch = new List<ISqlInstruction>();

            var ids = CollectGroupChilds(tenant, id.ToString());

            batch.Add(Delete("core_acl", tenant).Where(Exp.In("subject", ids)));
            batch.Add(Delete("core_subscription", tenant).Where(Exp.In("recipient", ids)));
            batch.Add(Delete("core_subscriptionmethod", tenant).Where(Exp.In("recipient", ids)));
            if (immediate)
            {
                batch.Add(Delete("core_usergroup", tenant).Where(Exp.In("groupid", ids)));
                batch.Add(Delete("core_group", tenant).Where(Exp.In("id", ids)));
            }
            else
            {
                batch.Add(Update("core_usergroup", tenant).Set("removed", true).Set("last_modified", DateTime.UtcNow).Where(Exp.In("groupid", ids)));
                batch.Add(Update("core_group", tenant).Set("removed", true).Set("last_modified", DateTime.UtcNow).Where(Exp.In("id", ids)));
            }

            ExecBatch(batch);
        }

        public IDictionary<string, UserGroupRef> GetUserGroupRefs(int tenant, DateTime from)
        {
            var q = GetUserGroupRefQuery(tenant, from);
            return ExecList(q).ConvertAll(ToUserGroupRef).ToDictionary(r => r.CreateKey());
        }

        public UserGroupRef SaveUserGroupRef(int tenant, UserGroupRef r)
        {
            if (r == null) throw new ArgumentNullException("userGroupRef");

            r.LastModified = DateTime.UtcNow;
            r.Tenant = tenant;

            var i = Insert("core_usergroup", tenant)
                .InColumnValue("userid", r.UserId.ToString())
                .InColumnValue("groupid", r.GroupId.ToString())
                .InColumnValue("ref_type", (int)r.RefType)
                .InColumnValue("removed", r.Removed)
                .InColumnValue("last_modified", r.LastModified);
            var u = Update("core_user", tenant).Set("last_modified", r.LastModified).Where("id", r.UserId.ToString());

            ExecBatch(i, u);

            return r;
        }

        public void RemoveUserGroupRef(int tenant, Guid userId, Guid groupId, UserGroupRefType refType)
        {
            RemoveUserGroupRef(tenant, userId, groupId, refType, false);
        }

        public void RemoveUserGroupRef(int tenant, Guid userId, Guid groupId, UserGroupRefType refType, bool immediate)
        {
            var where = Exp.Eq("userid", userId.ToString()) & Exp.Eq("groupid", groupId.ToString()) & Exp.Eq("ref_type", (int)refType);
            var i = immediate ?
                        Delete("core_usergroup", tenant).Where(where) :
                        (ISqlInstruction)Update("core_usergroup", tenant).Where(where).Set("removed", true).Set("last_modified", DateTime.UtcNow);
            var u = Update("core_user", tenant).Set("last_modified", DateTime.UtcNow).Where("id", userId.ToString());
            ExecBatch(i, u);
        }

        private static SqlQuery GetUserQuery()
        {
            return new SqlQuery("core_user u")
                .Select("u.id", "u.username", "u.firstname", "u.lastname", "u.sex", "u.bithdate", "u.status", "u.title")
                .Select("u.workfromdate", "u.terminateddate", "u.contacts", "u.email", "u.location", "u.notes", "u.removed")
                .Select("u.last_modified", "u.tenant", "u.activation_status", "u.culture", "u.phone", "u.phone_activation", "u.sid", "u.sso_name_id", "u.sso_session_id", "u.create_on");
        }

        private static SqlQuery GetUserQuery(int tenant, DateTime from)
        {
            var q = GetUserQuery();
            var where = Exp.Empty;
            if (tenant != Tenant.DEFAULT_TENANT)
            {
                where &= Exp.Eq("u.tenant", tenant);
            }
            if (from != default)
            {
                where &= Exp.Ge("u.last_modified", from);
            }
            if (where != Exp.Empty)
            {
                q.Where(where);
            }
            else
            {
                q.Where(Exp.False);
            }
            return q;
        }

        private static UserInfo ToUser(object[] r)
        {
            var u = new UserInfo
            {
                ID = new Guid((string)r[0]),
                UserName = (string)r[1],
                FirstName = (string)r[2],
                LastName = (string)r[3],
                Sex = r[4] != null ? Convert.ToBoolean(r[4]) : (bool?)null,
                BirthDate = (DateTime?)r[5],
                Status = (EmployeeStatus)Convert.ToInt32(r[6]),
                Title = (string)r[7],
                WorkFromDate = (DateTime?)r[8],
                TerminatedDate = (DateTime?)r[9],
                Email = (string)r[11],
                Location = (string)r[12],
                Notes = (string)r[13],
                Removed = Convert.ToBoolean(r[14]),
                LastModified = Convert.ToDateTime(r[15]),
                Tenant = Convert.ToInt32(r[16]),
                ActivationStatus = (EmployeeActivationStatus)Convert.ToInt32(r[17]),
                CultureName = (string)r[18],
                MobilePhone = (string)r[19],
                MobilePhoneActivationStatus = (MobilePhoneActivationStatus)Convert.ToInt32(r[20]),
                Sid = (string)r[21],
                SsoNameId = (string)r[22],
                SsoSessionId = (string)r[23],
                CreateDate = Convert.ToDateTime(r[24])
            };
            u.ContactsFromString((string)r[10]);
            return u;
        }

        private static SqlQuery GetGroupQuery(int tenant, DateTime from)
        {
            var q = new SqlQuery("core_group").Select("id", "name", "parentid", "categoryid", "removed", "last_modified", "tenant", "sid");
            var where = Exp.Empty;
            if (tenant != Tenant.DEFAULT_TENANT)
            {
                where &= Exp.Eq("tenant", tenant);
            }
            if (from != default)
            {
                where &= Exp.Ge("last_modified", from);
            }
            if (where != Exp.Empty)
            {
                q.Where(where);
            }
            else
            {
                q.Where(Exp.False);
            }
            return q;
        }

        private Group ToGroup(object[] r)
        {
            return new Group
            {
                Id = new Guid((string)r[0]),
                Name = (string)r[1],
                ParentId = r[2] != null ? new Guid((string)r[2]) : Guid.Empty,
                CategoryId = r[3] != null ? new Guid((string)r[3]) : Guid.Empty,
                Removed = Convert.ToBoolean(r[4]),
                LastModified = Convert.ToDateTime(r[5]),
                Tenant = Convert.ToInt32(r[6]),
                Sid = (string)r[7]
            };
        }

        private List<string> CollectGroupChilds(int tenant, string id)
        {
            var result = new List<string>();
            var childs = ExecList(Query("core_group", tenant).Select("id").Where("parentid", id)).ConvertAll(r => (string)r[0]);
            foreach (var child in childs)
            {
                result.Add(child);
                result.AddRange(CollectGroupChilds(tenant, child));
            }
            result.Add(id);
            return result.Distinct().ToList();
        }

        private static SqlQuery GetUserGroupRefQuery(int tenant, DateTime from)
        {
            var q = new SqlQuery("core_usergroup").Select("userid", "groupid", "ref_type", "removed", "last_modified", "tenant");
            var where = Exp.Empty;
            if (tenant != Tenant.DEFAULT_TENANT)
            {
                where &= Exp.Eq("tenant", tenant);
            }
            if (from != default)
            {
                where &= Exp.Ge("last_modified", from);
            }
            if (where != Exp.Empty)
            {
                q.Where(where);
            }
            else
            {
                q.Where(Exp.False);
            }
            return q;
        }

        private static UserGroupRef ToUserGroupRef(object[] r)
        {
            return new UserGroupRef(new Guid((string)r[0]), new Guid((string)r[1]), (UserGroupRefType)Convert.ToInt32(r[2]))
            {
                Removed = Convert.ToBoolean(r[3]),
                LastModified = Convert.ToDateTime(r[4]),
                Tenant = Convert.ToInt32(r[5])
            };
        }
    }
}