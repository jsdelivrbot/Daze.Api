﻿using System;
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
using Microsoft.AspNetCore.Routing.Constraints;
using Marten;
using Daze.Infrastructure;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.AspNetCore.Mvc;

namespace Daze.Api
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
                options.AddPolicy("CorsPolicy", builder =>
                    builder.WithOrigins("http://localhost:3000")
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials())
            );
            services.AddMvc();
            services.Configure<MvcOptions>(options =>
                options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"))
            );
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IPostRepository, PostRepository>();
            services.AddTransient<ITagRepository, TagRepository>();
            services.AddTransient<IProjectRepository, ProjectRepository>();
            services.AddTransient<ISkillRepository, SkillRepository>();
            services.AddScoped<IDocumentStore>(provider =>
                DocumentStore.For("host=localhost;database=daze_api;password=daze;username=daze")
            );
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            app.UseCors("CorsPolicy");

            app.UseMvc(options =>
                options.MapRoute("DefaultWebApi", "api/{controller}/{action}")
            );

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
        }
    }

    // namespace ends here
}