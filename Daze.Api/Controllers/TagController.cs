using Daze.Domain;
using Daze.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Daze.Api.Controllers
{
    [Route("api/tag/")]
    public class TagController : Controller
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet, Route("{id:guid?}")]
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

        [HttpGet, Route("{id:guid}")]
        public async Task<IActionResult> Head(Guid id)
        {
            var tag = await this._tagRepository.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            return Ok(); 
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Tag tag)
        {
            if (tag == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._tagRepository.AddAsync(tag);
            return Ok(tag);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Tag tag)
        {
            if (tag == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var existingTag = await this._tagRepository.FindAsync(tag.ID);
            if (existingTag != null)
            {
                await this._tagRepository.RemoveAsync(tag.ID);
                await this._tagRepository.AddAsync(tag);
            }

            var updatedTag = await this._tagRepository.FindAsync(tag.ID);
            return Ok(updatedTag);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] Tag tag)
        {
            if (tag == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._tagRepository.PatchTagAsync(tag);
            var patchedTag = await this._tagRepository.FindAsync(tag.ID);

            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._tagRepository.RemoveAsync(id);
            return Ok();
        }
    }
}
