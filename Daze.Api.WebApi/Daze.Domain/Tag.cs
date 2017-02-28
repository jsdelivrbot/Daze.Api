﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class Tag : IEntity
    {
        public Guid ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public static bool operator ==(Tag x, Tag y)
        {
            return x?.Name == y?.Name;
        }

        public static bool operator !=(Tag x, Tag y)
        {
            return !(x?.Name == y?.Name);
        }
    }
}