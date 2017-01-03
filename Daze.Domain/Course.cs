using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class Course : IEntity
    {
        public Guid ID { get; set; }
        public string CourseTag { get; set; }
        public string CourseTitle { get; set; }
    }
}
