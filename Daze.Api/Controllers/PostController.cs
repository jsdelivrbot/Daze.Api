using System;
using Microsoft.AspNetCore.Mvc;
using Daze.Infrastructure.Interfaces;
using Daze.Domain;
using System.Threading.Tasks;

namespace Daze.Api.Controllers
{
    [Route("api/post/")]
    public class PostController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository _postRepository;
        public PostController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _postRepository = _unitOfWork.PostRepo;
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
            this._unitOfWork.CommitChanges();

            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await this._postRepository.RemoveAsync(id);
            this._unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
