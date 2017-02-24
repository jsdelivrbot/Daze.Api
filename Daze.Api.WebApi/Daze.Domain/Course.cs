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

        public static bool operator ==(Course x, Course y)
        {
            return x?.CourseTag == y?.CourseTag &&
                x?.CourseTitle == y?.CourseTitle;
        }
        public static bool operator !=(Course x, Course y)
        {
            return !(x?.CourseTag == y?.CourseTag &&
             x?.CourseTitle == y?.CourseTitle);
        }
    }
}
