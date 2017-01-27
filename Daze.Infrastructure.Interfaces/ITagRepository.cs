using Daze.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure.Interfaces
{
    public interface ITagRepository : IRepository<Tag>
    {
        Task PatchTagAsync(Tag tag);
    }
}
