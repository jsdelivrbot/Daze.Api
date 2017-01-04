
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IPostRepository PostRepo { get; set; }
        ITagRepository TagRepo { get; set; }
        ISkillRepository SkillRepo { get; set; }

        void CommitChanges();
    }
}
