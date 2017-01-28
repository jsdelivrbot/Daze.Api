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
        private ISkillRepository _skillRepository;
        public SkillController(ISkillRepository skillRepository)
        {
            this._skillRepository = skillRepository;
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

        [HttpHead, Route("{id:guid}")]
        public async Task<IActionResult> Head(Guid id)
        {
            var skill = await this._skillRepository.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Skill skill)
        {
            if (skill == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._skillRepository.AddAsync(skill);
            return Ok(skill);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Skill skill)
        {
            if (skill == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var existingSkill = await this._skillRepository.FindAsync(skill.ID);
            if (existingSkill != null)
            {
                await this._skillRepository.RemoveAsync(skill.ID);
                await this._skillRepository.AddAsync(skill);
            }

            var updatedSkill = await this._skillRepository.FindAsync(skill.ID);
            return Ok(updatedSkill);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] Skill skill)
        {
            if (skill == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._skillRepository.PatchSkillAsync(skill);
            var patchedSkill = this._skillRepository.FindAsync(skill.ID);

            return Ok(patchedSkill);
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._skillRepository.RemoveAsync(id);
            return Ok();
        }
    }
}
