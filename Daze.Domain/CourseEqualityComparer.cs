using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class CourseEqualityComparer : IEqualityComparer<Course>
    {
        public bool Equals(Course x, Course y)
        {
            return x?.CourseTag == y?.CourseTag && x?.CourseTitle == y?.CourseTitle;
        }

        public int GetHashCode(Course course)
        {
            return course.CourseTitle.GetHashCode() + course.CourseTag.GetHashCode();
        }
    }
}
