using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class Skill : IEntity
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public string FocusArea { get; set; }

        public ICollection<Course> Courses { get; set; }
    }
}
