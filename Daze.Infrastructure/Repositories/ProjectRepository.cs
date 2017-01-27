using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Marten;

namespace Daze.Infrastructure.Repositories
{
    public sealed class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository(IDocumentStore store) : base(store)
        {
        }

        public async Task PatchProjectAsync(Project project)
        {
            var loadedProject = await this._session.LoadAsync<Project>(project.ID);

            if (project?.Name != loadedProject?.Name)
            {
                project.Name = loadedProject?.Name;
            }

            if (project?.Url != loadedProject?.Url)
            {
                project.Url = loadedProject?.Url;
            }

            if (project?.Description != loadedProject?.Description)
            {
                project.Description = loadedProject?.Description;
            }

            await this._session.SaveChangesAsync();
        }
    }
}
