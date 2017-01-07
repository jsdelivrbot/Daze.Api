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
        public IActionResult Get(Guid? id)
        {
            if (id.HasValue)
            {
                var skill = this._skillRepository.Find(id.Value);
                return Json(skill);
            }

            var skills = this._skillRepository.GetAll();
            return Json(skills);
        }

        [HttpPost]
        public IActionResult Post([FromBody,]Skill skill)
        {
            if (skill == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            this._skillRepository.Add(skill);
            this._unitOfWork.CommitChanges();

            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            this._skillRepository.Remove(id);
            this._unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
