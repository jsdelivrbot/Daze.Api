using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure.Interfaces
{
    public interface IRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAllPagedAsync(int pageNumber, int numberOfItemsPerPage);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> FindAsync(Guid id);

        Task AddAsync(TEntity entity);
        Task RemoveAsync(Guid entity);
    }
}
