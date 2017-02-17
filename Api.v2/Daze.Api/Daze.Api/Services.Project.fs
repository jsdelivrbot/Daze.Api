[<RequireQualifiedAccess>]
module Daze.Api.ProjectService

open Daze.Api.Services
open Daze.Api.Domain

let getAllProjects() = 
    query { 
        for p in ctx.Public.Project do
        select { Id = p.Id
                 Name = p.Name
                 Description = p.Description
                 Url = p.Url }
    }
    |> Seq.cache

let findProjectById (id: int64) = 
    query {
        for p in ctx.Public.Project do
        where (p.Id = id)
        select { Id = p.Id
                 Name = p.Name
                 Description = p.Description 
                 Url = p.Url }
        exactlyOne
    }

let existsProject (id: int64) = 
    query {
        for p in ctx.Public.Project do
        exists (p.Id = id)
    }

let insertNewProject (project: Project) =
    async { 
        let newProject = ctx.Public.Project.Create()
        newProject.Name <- project.Name
        newProject.Description <- project.Description
        newProject.Url <- project.Url 
        do! ctx.SubmitUpdatesAsync()
    }

let asyncFullyUpdateProject (project: Project) = 
    async {
        query {
            for p in ctx.Public.Project do
            where (p.Id = project.Id)
        }
        |> Seq.iter (fun p ->
            p.Name <- project.Name
            p.Description <- project.Description
            p.Url <- project.Url
        )

        do! ctx.SubmitUpdatesAsync()
    }

let asyncPartiallyUpdateProject (project: Project) =
    async {
        query {
            for p in ctx.Public.Project do
            where (p.Id = project.Id)
        }
        |> Seq.iter (fun p ->
            if not (isNull project.Name) then
                p.Name <- project.Name

            if not (isNull project.Description) then 
                p.Description <- project.Description

            if not (isNull project.Url) then 
                p.Url <- project.Url
        )

        do! ctx.SubmitUpdatesAsync()
    }

let removeProject (id: int64) = 
    async {
        let post = ctx.Public.Project.Create()
        post.Id <- id
        post.Delete()
        do! ctx.SubmitUpdatesAsync()
    } |> Async.RunSynchronously















