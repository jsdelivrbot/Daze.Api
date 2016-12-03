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
        where TEntity : class
    {
        private readonly IDocumentSession _session;
        private readonly IDocumentStore _store;

        public Repository()
        {
            _store = DocumentStore.For(options =>
            {
                options.Connection("host=localhost;database=daze_api;password=daze;username=daze");
                options.AutoCreateSchemaObjects = AutoCreate.CreateOrUpdate;
            });

            _session = _store.OpenSession(DocumentTracking.IdentityOnly);
        }

        public TEntity Find(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> GetAllAsJson()
        {
            var res = _store.LightweightSession(System.Data.IsolationLevel.ReadCommitted);

            var result = res.Query<TEntity>().ToList();

            return result;
        }

        public void Add(TEntity entity)
        {
            _session.Store<TEntity>(entity);
            _session.SaveChanges();
        }

        public void Remove(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
