using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Daze.Infrastructure.Interfaces;
using Daze.Infrastructure.Repositories;

namespace Daze.Api
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddTransient<IPostRepository, PostRepository>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            app.UseMvc(options =>
                options.MapRoute(
                    name: "DefaultWebApi",
                    template: "api/{controller=Home}/{action=Get}/{id?}"
            ));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

        }
    }

    // namespace ends here
}
