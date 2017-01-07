﻿using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Marten;

namespace Daze.Infrastructure.Repositories
{
    public sealed class PostRepository : Repository<Post>, IPostRepository
    {
        public PostRepository(IDocumentStore store) : base(store)
        {
        }
    }
}
