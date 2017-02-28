﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class User : IEntity
    {
        public Guid ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}