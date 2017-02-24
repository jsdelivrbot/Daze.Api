using Marten;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Marten.Schema;
using Marten.Services;
using Remotion.Linq.Parsing.Structure;

namespace Daze.Infrastructure
{
    public class DefaultContext : DocumentStore
    {
        public DefaultContext(StoreOptions options)
            : base(options)
        {
            options.Connection("host=localhost;database=daze_api;password=daze;username=daze");
            options.DatabaseSchemaName = "blog";
        }
    }
}
