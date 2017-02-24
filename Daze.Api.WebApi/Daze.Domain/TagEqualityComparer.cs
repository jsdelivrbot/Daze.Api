using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class TagEqualityComparer : IEqualityComparer<Tag>
    {
        public bool Equals(Tag x, Tag y)
        {
            return x?.Name == y?.Name;
        }

        public int GetHashCode(Tag tag)
        {
            return tag.Name.GetHashCode() ^ 2;
        }
    }
}
