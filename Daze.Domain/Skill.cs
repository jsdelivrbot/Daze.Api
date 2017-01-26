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

        public static bool operator ==(Skill x, Skill y)
        {
            if (x?.Courses != null && y?.Courses != null)
            {
                return x?.Name == y?.Name &&
                    x?.Level == y?.Level &&
                    x?.FocusArea == y?.FocusArea &&
                    x.Courses.SequenceEqual(y.Courses, new CourseEqualityComparer());
            }

            return false;
        }

        public static bool operator !=(Skill x, Skill y)
        {
            if (x?.Courses != null && y?.Courses != null)
            {
                return !(x?.Name == y?.Name &&
                    x?.Level == y?.Level &&
                    x?.FocusArea == y?.FocusArea &&
                    x.Courses.SequenceEqual(y.Courses, new CourseEqualityComparer()));
            }

            return true;
        }
    }
}
