using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Api.Controllers
{
    [Route("api/project/")]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository)
        {
            this._projectRepository = projectRepository;
        }

        [HttpGet, Route("{id:guid?}")]
        public async Task<IActionResult> Get(Guid? id, int? page, int? pageSize)
        {
            if (id.HasValue)
            {
                var project = await this._projectRepository.FindAsync(id.Value);
                return Json(project);
            }

            var projects = (page.HasValue && pageSize.HasValue) ?
                await this._projectRepository.GetAllPagedAsync(page.Value, pageSize.Value) :
                await this._projectRepository.GetAllAsync();

            return Json(projects);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Project project)
        {
            if (project == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._projectRepository.AddAsync(project);
            return Ok(project);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Project project)
        {
            if (project == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var existingProject = await this._projectRepository.FindAsync(project.ID);
            if (existingProject != null)
            {
                await this._projectRepository.RemoveAsync(project.ID);
                await this._projectRepository.AddAsync(project);
            }

            var updatedProject = await this._projectRepository.FindAsync(project.ID);
            return Ok(updatedProject);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] Project project)
        {
            if (project == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._projectRepository.PatchProjectAsync(project);
            var patchedProject = await this._projectRepository.FindAsync(project.ID);

            return Ok(patchedProject);
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._projectRepository.RemoveAsync(id);
            return Ok();
        }
    }
}
