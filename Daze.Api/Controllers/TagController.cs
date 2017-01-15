using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Api.Controllers
{
    public class TagController : Controller
    {
        private readonly IUnitOfWork _unitOfWork; // fix uow 
        private readonly ITagRepository _tagRepository;
        public TagController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _tagRepository = _unitOfWork.TagRepo;
        }

        [HttpGet, Route("api/tag/{id:guid?}")]
        public IActionResult Get(Guid? id, int? page, int? pageSize)
        {
            if (id.HasValue)
            {
                var tag = _tagRepository.Find(id.Value);
                return Json(tag);
            }

            var tags = (page.HasValue && pageSize.HasValue) ?
                this._tagRepository.GetAllPaged(page.Value, pageSize.Value) :
                this._tagRepository.GetAll();

            return Json(tags);
        }

        [HttpPost, Route("api/tag")]
        public IActionResult Post([FromBody]Tag tag)
        {
            if (tag == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _tagRepository.Add(tag);
            _unitOfWork.CommitChanges();

            return Ok();
        }

        [HttpDelete, Route("api/tag/{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            _tagRepository.Remove(id);
            _unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
