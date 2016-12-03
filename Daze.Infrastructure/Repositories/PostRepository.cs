using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure.Repositories
{
    public class PostRepository : Repository<Post>, IPostRepository
    {
    }
}
