using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using Marten;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntity
    {
        protected readonly IDocumentSession _session;
        public Repository(IDocumentStore store)
        {
            _session = store.OpenSession(DocumentTracking.DirtyTracking);
        }

        public TEntity Find(Guid id)
        {
            return _session.Query<TEntity>().FirstOrDefault(q => q.ID == id);
        }

        public IEnumerable<TEntity> GetAllPaged(int pageNumber, int numberOfItemsPerPage)
        {
            var entityCount = this._session.Query<TEntity>().Count();
            int startingIndex = (pageNumber - 1) * numberOfItemsPerPage;
            int endIndex = Math.Min(startingIndex + numberOfItemsPerPage, entityCount);

            var entities = this._session.Query<TEntity>().ToArray();
            for (int i = startingIndex; i < endIndex; i++)
            {
                yield return entities[i];
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _session.Query<TEntity>().ToList();
        }

        public void Add(TEntity entity)
        {
            _session.Store<TEntity>(entity);
            _session.SaveChanges();
        }

        public void Remove(Guid id)
        {
            _session.Delete<TEntity>(id);
            _session.SaveChanges();
        }
    }
}
