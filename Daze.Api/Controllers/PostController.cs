using System;
using Microsoft.AspNetCore.Mvc;
using Daze.Infrastructure.Interfaces;
using Daze.Domain;

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
        public IActionResult Get(Guid? id, int? page, int? pageSize)
        {
            if (id.HasValue)
            {
                var post = _postRepository.Find(id.Value);
                return Json(post);
            }

            var posts = (page.HasValue && pageSize.HasValue) ?
                this._postRepository.GetAllPaged(page.Value, pageSize.Value) :
                this._postRepository.GetAll();

            return Json(posts);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Post post)
        {
            if (post == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _postRepository.Add(post);
            _unitOfWork.CommitChanges();

            return Ok();
        }

        [HttpDelete, Route("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            _postRepository.Remove(id);
            _unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
