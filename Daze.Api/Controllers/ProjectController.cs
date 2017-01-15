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
        public IActionResult Get(Guid? id, int? page, int? pageSize)
        {
            if (id.HasValue)
            {
                var project = this._projectRepository.Find(id.Value);
                return Json(project);
            }

            var projects = (page.HasValue && pageSize.HasValue) ?
                this._projectRepository.GetAllPaged(page.Value, pageSize.Value) :
                this._projectRepository.GetAll();

            return Json(projects);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Project project)
        {
            if (project == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            this._projectRepository.Add(project);

            this._unitOfWork.CommitChanges();
            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            this._projectRepository.Remove(id);
            this._unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
