using System;
using Microsoft.AspNetCore.Mvc;
using Daze.Infrastructure.Interfaces;
using Daze.Domain;

namespace Daze.Api.Controllers
{
    public class PostController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository _postRepository;
        public PostController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _postRepository = _unitOfWork.PostRepo;
        }

        [HttpGet, Route("api/post/{id:guid?}")]
        public IActionResult Get(Guid? id)
        {
            if (id.HasValue)
            {
                var post = _postRepository.Find(id.Value);
                return Json(post);
            }

            var posts = _postRepository.GetAll();
            return Json(posts);
        }

        [HttpPost, Route("api/post")]
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

        [HttpDelete, Route("api/post/{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            _postRepository.Remove(id);
            _unitOfWork.CommitChanges();

            return Ok();
        }
    }
}
