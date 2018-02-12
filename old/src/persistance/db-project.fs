namespace Persistance.Db

[<RequireQualifiedAccess>]
module Project =

    open Domain
    open BaseDb
    open Mappings

    let getAllProjects() =
        query {
            for p in ctx.Public.Project do
            select { Id = p.Id
                     ProjectName = p.Name
                     Description = p.Description
                     Url = p.Url
                     PublishedYear = p.PublishedYear }
        } |> Seq.cache

    let findProjectById (id: int64) =
        let project = query {
            for p in ctx.Public.Project do
            where (p.Id = id)
            exactlyOneOrDefault
        }
        if isNull project then None
        else Some { Id = project.Id
                    ProjectName = project.Name
                    Description = project.Description
                    Url = project.Url
                    PublishedYear = project.PublishedYear }

    let existsProject (id: int64) =
        query {
            for p in ctx.Public.Project do
            exists (p.Id = id)
        }

    let insertNewProject (project: Project) =
        async {
            let newProject = ctx.Public.Project.Create()
            newProject.Name <- project.ProjectName
            newProject.Description <- project.Description
            newProject.Url <- project.Url
            newProject.PublishedYear <- project.PublishedYear
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
                foundProject.Name <- project.ProjectName
                foundProject.Description <- project.Description
                foundProject.Url <- project.Url
                foundProject.PublishedYear <- project.PublishedYear

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
                if not (isNull project.ProjectName) then
                    foundProject.Name <- project.ProjectName

                if project.Description.IsSome then
                    foundProject.Description <- project.Description

                if project.Url.IsSome then
                    foundProject.Url <- project.Url

                if project.PublishedYear.IsSome then
                    foundProject.PublishedYear <- project.PublishedYear


            do! ctx.SubmitUpdatesAsync()
        }

    let removeProject (id: int64) =
        async {
            let post = ctx.Public.Project.Create()
            post.Id <- id
            post.Delete()
            do! ctx.SubmitUpdatesAsync()
        } |> Async.RunSynchronously
