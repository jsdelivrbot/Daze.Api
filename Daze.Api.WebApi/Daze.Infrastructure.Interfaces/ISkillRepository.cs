﻿using Daze.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Infrastructure.Interfaces
{
    public interface ISkillRepository : IRepository<Skill>
    {
        Task PatchSkillAsync(Skill skill);
    }
}