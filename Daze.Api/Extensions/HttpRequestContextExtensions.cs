using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Api.Extensions
{
    public static class HttpRequestContextExtensions
    {
        public static string GenerateRequestUri(this HttpRequest request)
        {
            return String.Format("{0}://{1}{2}/", request.Scheme, request.Host, request.Path);
        }
    }
}
