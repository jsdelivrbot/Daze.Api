using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public class PostEqualityComparer : IEqualityComparer<Post>
    {
        public bool Equals(Post x, Post y)
        {
            if (x?.Tags != null && y?.Tags != null)
            {
                return x?.Title == y?.Title &&
                    x?.Content == y?.Content &&
                    x.Tags.SequenceEqual(y.Tags, new TagEqualityComparer());
            }

            return (x?.Title == y?.Title && x?.Content == y?.Content);
        }

        public int GetHashCode(Post post)
        {
            if (post?.Title != null && post?.Content != null && post?.Tags != null)
            {
                return post.Title.GetHashCode() +
                    post.Content.GetHashCode() +
                    post.Tags.GetHashCode();
            }
            else if (post?.Title != null && post?.Content != null)
            {
                return post.Title.GetHashCode() + post.Content.GetHashCode();
            }
            else
            {
                return -1;
            }
        }
    }
}
