using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class Tag
    {
        public Guid ID { get; set; }
        public string Name { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
