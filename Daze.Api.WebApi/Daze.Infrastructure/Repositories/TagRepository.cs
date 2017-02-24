using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Marten;

namespace Daze.Infrastructure.Repositories
{
    public sealed class TagRepository : Repository<Tag>, ITagRepository
    {
        public TagRepository(IDocumentStore store) : base(store)
        {
        }

        public async Task PatchTagAsync(Tag tag)
        {
            var loadedTag = await this._session.LoadAsync<Tag>(tag.ID);

            if (tag?.Name != loadedTag?.Name)
            {
                tag.Name = loadedTag?.Name;
            }

            if (tag?.Posts.SequenceEqual(loadedTag?.Posts, new PostEqualityComparer()) ?? false)
            {
                tag.Posts = loadedTag?.Posts; 
            }

            await this._session.SaveChangesAsync();
        }
    }
}
