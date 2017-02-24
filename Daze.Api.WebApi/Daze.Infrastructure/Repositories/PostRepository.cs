using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Marten;
using System.Reflection;

namespace Daze.Infrastructure.Repositories
{
    public sealed class PostRepository : Repository<Post>, IPostRepository
    {
        public PostRepository(IDocumentStore store) : base(store)
        {
        }

        public async Task PatchPostAsync(Post post)
        {
            var loadedPost = await this._session.LoadAsync<Post>(post.ID);

            if (post?.Title != loadedPost?.Title)
            {
                loadedPost.Title = post?.Title;
            }

            if (post?.Content != loadedPost?.Content)
            {
                loadedPost.Content = post?.Content;
            }

            if (post?.Tags?.SequenceEqual(loadedPost?.Tags, new TagEqualityComparer()) ?? false)
            {
                post.Tags = loadedPost.Tags;
            }

            if (post?.CreatedAt != loadedPost?.CreatedAt)
            {
                post.CreatedAt = loadedPost.CreatedAt;
            }

            if (post?.ModifiedAt != loadedPost?.ModifiedAt)
            {
                post.ModifiedAt = loadedPost.ModifiedAt;
            }

            await this._session.SaveChangesAsync();
        }
    }
}
