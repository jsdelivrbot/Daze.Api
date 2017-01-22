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
        public async Task<IActionResult> Get(Guid? id, int? page, int? pageSize)
        {
            if (id.HasValue)
            {
                var tag = await this._tagRepository.FindAsync(id.Value);
                return Json(tag);
            }

            var tags = (page.HasValue && pageSize.HasValue) ?
                await this._tagRepository.GetAllPagedAsync(page.Value, pageSize.Value) :
                await this._tagRepository.GetAllAsync();

            return Json(tags);
        }

        [HttpPost, Route("api/tag")]
        public async Task<IActionResult> Post([FromBody]Tag tag)
        {
            if (tag == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._tagRepository.AddAsync(tag);
            this._unitOfWork.CommitChanges();

            return Ok();
        }

        [HttpDelete, Route("api/tag/{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._tagRepository.RemoveAsync(id);
            this._unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
