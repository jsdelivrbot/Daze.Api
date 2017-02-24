using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Domain
{
    public interface IEntity 
    {
        Guid ID { get; set; }
    }
}
