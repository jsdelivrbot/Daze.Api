using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Daze.Infrastructure.Interfaces;
using Newtonsoft.Json;
using System.Text;

namespace Daze.Api.Controllers
{
    public class PostController : Controller
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public IActionResult Get()
        {
            //_postRepository.Add(new Domain.Post()
            //{
            //    Title = "dfsdf",
            //    Content = "sdfsd"
            //});
            var resultr = _postRepository.GetAllAsJson();
            return Json(resultr);
        }





    }
}
