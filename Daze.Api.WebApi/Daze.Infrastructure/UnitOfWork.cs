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
            this._session = store.DirtyTrackedSession(System.Data.IsolationLevel.Unspecified);
            this.PostRepo = new PostRepository(store);
            this.TagRepo = new TagRepository(store);
            this.SkillRepo = new SkillRepository(store);
            this.ProjectRepo = new ProjectRepository(store);
        }

        public IPostRepository PostRepo { get; set; }
        public ITagRepository TagRepo { get; set; }
        public ISkillRepository SkillRepo { get; set; }
        public IProjectRepository ProjectRepo { get; set; }

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
