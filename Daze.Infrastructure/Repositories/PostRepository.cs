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

            if (entity.Title != null && entity.Title != loadedPost.Title)
            {
                loadedPost.Title = entity.Title;
            }

            if (entity.Content != null && entity.Content != loadedPost.Content)
            {
                loadedPost.Content = entity.Content;
            }

            if (entity.Tags != null && entity.Tags != loadedPost.Tags) // overload != operator
            {
            }

            await this._session.SaveChangesAsync();
        }

    }
}
