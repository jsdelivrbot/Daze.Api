﻿[<RequireQualifiedAccess>]
module Daze.Api.ProjectService

open Daze.Api.Services
open Daze.Api.Domain

let getAllProjects() = 
    let projects = query { 
        for p in ctx.Public.Project do
        select { Id = p.Id
                 Name = p.Name
                 Description = p.Description
                 Url = p.Url }
    }
    if Seq.isEmpty projects then None
    else Some (Seq.cache projects)

let findProjectById (id: int64) = 
    let project = query {
        for p in ctx.Public.Project do
        where (p.Id = id)
        exactlyOneOrDefault
    }
    if isNull project then None
    else Some { Id = project.Id
                Name = project.Name
                Description = project.Description 
                Url = project.Url }

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
        
        try 
            do! ctx.SubmitUpdatesAsync()
        with _ ->
            ctx.GetUpdates()
            ctx.ClearUpdates()
    }

let asyncFullyUpdateProject (project: Project) = 
    async {
        let foundProject = query {
            for p in ctx.Public.Project do
            where (p.Id = project.Id)
            exactlyOneOrDefault
        }
        if not (isNull foundProject) then
            foundProject.Name <- project.Name
            foundProject.Description <- project.Description
            foundProject.Url <- project.Url

        do! ctx.SubmitUpdatesAsync()
    }

let asyncPartiallyUpdateProject (project: Project) =
    async {
        let foundProject = query {
            for p in ctx.Public.Project do
            where (p.Id = project.Id)
            exactlyOneOrDefault
        }
        if not (isNull foundProject) then
            if not (isNull project.Name) then
                foundProject.Name <- project.Name

            if not (isNull project.Description) then 
                foundProject.Description <- project.Description

            if not (isNull project.Url) then 
                foundProject.Url <- project.Url

        do! ctx.SubmitUpdatesAsync()
    }

let removeProject (id: int64) = 
    async {
        let post = ctx.Public.Project.Create()
        post.Id <- id
        post.Delete()
        do! ctx.SubmitUpdatesAsync()
    } |> Async.RunSynchronously














