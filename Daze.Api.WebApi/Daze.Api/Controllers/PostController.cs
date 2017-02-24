using System;
using Microsoft.AspNetCore.Mvc;
using Daze.Infrastructure.Interfaces;
using Daze.Domain;
using System.Threading.Tasks;
using Daze.Api.Models;

namespace Daze.Api.Controllers
{
    [Route("api/post/")]
    public class PostController : Controller
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            this._postRepository = postRepository;
        }

        [HttpGet, Route("{id:guid?}")]
        public async Task<IActionResult> Get(Guid? id, int? page, int? pageSize)
        {
            if (id.HasValue)
            {
                var post = await this._postRepository.FindAsync(id.Value);
                return Json(post);
            }

            var posts = (page.HasValue && pageSize.HasValue) ?
                await this._postRepository.GetAllPagedAsync(page.Value, pageSize.Value) :
                await this._postRepository.GetAllAsync();

            var responseResult = (page.HasValue && pageSize.HasValue) ?
                new ResponseResultObject<Post>(posts, page.Value, pageSize.Value, Request.Path) :
                new ResponseResultObject<Post>(posts);

            return Json(responseResult);
        }

        [HttpHead, Route("{id:guid}")]
        public async Task<IActionResult> Head(Guid id)
        {
            var post = await this._postRepository.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Post post)
        {
            if (post == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._postRepository.AddAsync(post);
            var insertedPost = await this._postRepository.FindAsync(post.ID);

            return Ok(insertedPost);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Post post)
        {
            if (post == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var existingPost = await this._postRepository.FindAsync(post.ID);
            if (existingPost != null && existingPost != post)
            {
                await this._postRepository.RemoveAsync(post.ID);
                await this._postRepository.AddAsync(post);
            }

            var updatedPost = await this._postRepository.FindAsync(post.ID);
            return Ok(updatedPost);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody]Post post)
        {
            if (post == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._postRepository.PatchPostAsync(post);
            var patchedPost = this._postRepository.FindAsync(post.ID);

            return Ok(patchedPost);
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._postRepository.RemoveAsync(id);
            return Ok();
        }
    }
}
