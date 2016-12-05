using Daze.Infrastructure.Interfaces;
using Daze.Infrastructure.Repositories;
using Marten;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDocumentSession _session;
        public UnitOfWork(IDocumentStore store)
        {
            _session = store.DirtyTrackedSession(System.Data.IsolationLevel.Unspecified);
            PostRepo = new PostRepository(store);
            TagRepo = new TagRepository(store);
        }

        public IPostRepository PostRepo { get; set; }
        public ITagRepository TagRepo { get; set; }


        public void CommitChanges()
        {
            _session.SaveChanges();
        }

        public void Dispose()
        {
            _session.Dispose();
        }
    }
}
