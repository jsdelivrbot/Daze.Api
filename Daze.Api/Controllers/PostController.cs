﻿using System;
using Microsoft.AspNetCore.Mvc;
using Daze.Infrastructure.Interfaces;
using Daze.Domain;
using System.Threading.Tasks;

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

            return Json(posts);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Post post)
        {
            if (post == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            await this._postRepository.AddAsync(post);
            return Ok(post);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Post post)
        {
            if (post == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var existingPost = await this._postRepository.FindAsync(post.ID);
            if (existingPost != null)
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

            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._postRepository.RemoveAsync(id);
            return Ok();
        }
    }
}
