using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure.Interfaces
{
    public interface IRepository <TEntity>
    {
        IEnumerable<TEntity> GetAllAsJson();
        TEntity Find(int id);

        void Add(TEntity entity);
        void Remove(TEntity entity);
    }
}
