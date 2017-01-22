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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._projectRepository = this._unitOfWork.ProjectRepo;
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
            this._unitOfWork.CommitChanges();

            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._projectRepository.RemoveAsync(id);
            this._unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
