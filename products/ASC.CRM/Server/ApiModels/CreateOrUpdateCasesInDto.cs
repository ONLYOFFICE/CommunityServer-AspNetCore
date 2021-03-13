﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ASC.Api.Collections;

namespace ASC.CRM.ApiModels
{
    public class CreateOrUpdateCasesInDto
    {
        public string Title { get; set; }
        public IEnumerable<int> Members { get; set; }
        public IEnumerable<ItemKeyValuePair<int, string>> CustomFieldList { get; set; }
        public bool isPrivate { get; set; }
        public IEnumerable<Guid> accessList { get; set; }
        public bool isNotify { get; set; }
    }
}