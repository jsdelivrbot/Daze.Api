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

        public async Task PatchPostAsync(Post entity)
        {
            var loadedPost = await this._session.LoadAsync<Post>(entity.ID);

            if (entity?.Title != loadedPost?.Title)
            {
                loadedPost.Title = entity?.Title;
            }

            if (entity?.Content != loadedPost?.Content)
            {
                loadedPost.Content = entity?.Content;
            }

            if (entity?.Tags?.SequenceEqual(loadedPost?.Tags, new TagEqualityComparer()) ?? false)
            {
                entity.Tags = loadedPost.Tags;
            }

            await this._session.SaveChangesAsync();
        }

    }
}
