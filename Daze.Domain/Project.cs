using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class Project : IEntity
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        public static bool operator ==(Project x, Project y)
        {
            return x?.Name == y?.Name &&
                x?.Description == y?.Description &&
                x?.Url == y?.Url;
        }

        public static bool operator !=(Project x, Project y)
        {
            return !(x?.Name == y?.Name &&
                x?.Description == y?.Description &&
                x?.Url == y?.Url);
        }
    }
}
