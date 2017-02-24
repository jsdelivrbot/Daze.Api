using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Marten;

namespace Daze.Infrastructure.Repositories
{
    public sealed class SkillRepository : Repository<Skill>, ISkillRepository
    {
        public SkillRepository(IDocumentStore store) : base(store)
        {
        }

        public async Task PatchSkillAsync(Skill skill)
        {
            var loadedSkill = await this._session.LoadAsync<Skill>(skill.ID);

            if (skill?.Level != loadedSkill?.Level)
            {
                skill.Level = loadedSkill.Level;
            }

            if (skill?.Name != loadedSkill?.Name)
            {
                skill.Name = loadedSkill?.Name;
            }

            if (skill?.FocusArea != loadedSkill?.FocusArea)
            {
                skill.FocusArea = loadedSkill?.FocusArea;
            }

            if (skill?.Courses?.SequenceEqual(loadedSkill?.Courses, new CourseEqualityComparer()) ?? false)
            {
                skill.Courses = loadedSkill?.Courses;
            }

            await this._session.SaveChangesAsync();
        }
    }
}
