using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class Post : IEntity
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }

        public static bool operator ==(Post x, Post y)
        {
            if (x?.Tags != null && y?.Tags != null)
            {
                return x.Tags.SequenceEqual(y.Tags, new TagEqualityComparer());
            }
            return false;
        }

        public static bool operator !=(Post x, Post y)
        {
            if (x?.Tags != null && y?.Tags != null)
            {
                return !x.Tags.SequenceEqual(y.Tags, new TagEqualityComparer());
            }
            return true;
        }
    }
}
