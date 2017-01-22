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

        public async Task<TEntity> FindAsync(Guid id)
        {
            return await _session.Query<TEntity>().FirstOrDefaultAsync(q => q.ID == id);
        }

        public async Task<IEnumerable<TEntity>> GetAllPagedAsync(int pageNumber, int numberOfItemsPerPage)
        {
            var entityCount = this._session.Query<TEntity>().Count();
            int startIndex = (pageNumber - 1) * numberOfItemsPerPage;
            int endIndex = Math.Min(startIndex + numberOfItemsPerPage, entityCount);

            var entities = await this._session.Query<TEntity>().ToListAsync();

            var acc = new List<TEntity>();
            for (int i = startIndex; i < endIndex; i++)
                acc.Add(entities[i]);
            return acc;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _session.Query<TEntity>().ToListAsync();
        }

        public async Task AddAsync(TEntity entity)
        {
            _session.Store<TEntity>(entity);
            await _session.SaveChangesAsync();
        }

        public async Task RemoveAsync(Guid id)
        {
            _session.Delete<TEntity>(id);
            await _session.SaveChangesAsync();
        }
    }
}
