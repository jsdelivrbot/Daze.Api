using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Api.Controllers
{
    [Route("api/skill/")]
    public class SkillController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private ISkillRepository _skillRepository;
        public SkillController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._skillRepository = unitOfWork.SkillRepo;
        }

        [HttpGet, Route("{id:guid?}")]
        public async Task<IActionResult> Get(Guid? id, int? page, int? pageSize)
        {
            if (id.HasValue)
            {
                var skill = await this._skillRepository.FindAsync(id.Value);
                return Json(skill);
            }

            var skills = (page.HasValue && pageSize.HasValue) ?
                await this._skillRepository.GetAllPagedAsync(page.Value, pageSize.Value) :
                await this._skillRepository.GetAllAsync();

            return Json(skills);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody,]Skill skill)
        {
            if (skill == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._skillRepository.AddAsync(skill);
            this._unitOfWork.CommitChanges();

            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._skillRepository.RemoveAsync(id);
            this._unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
