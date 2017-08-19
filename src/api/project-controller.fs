[<RequireQualifiedAccess>]
module ProjectController

open Suave
open Suave.Successful
open Suave.Writers
open Utils
open Domain

let get =
    let projects = Db.Project.getAllProjects()
    match projects with
    | Some ps -> OKJson (serialize ps)
    | None -> no_content

let getSingle (id: int64) =
    let project = Db.Project.findProjectById id
    match project with
    | Some p -> OKJson (serialize p)
    | None -> no_content

let head (id: int64) =
    let exists = Db.Project.existsProject id
    if exists then setStatus HTTP_200
    else setStatus HTTP_204

let asyncPost (ctx: HttpContext) =
    async {
        let project = ctx.GetRequestBody<Project>()
        do! Db.Project.insertNewProject project
        return Some { ctx with response = ctx.GetResponseWith project }
    }

let asyncPut (ctx: HttpContext) =
    async {
        let project = ctx.GetRequestBody()
        do! Db.Project.asyncFullyUpdateProject project
        return Some { ctx with response = ctx.GetResponseWith project }
    }

let asyncPatch (ctx: HttpContext) =
    async {
        let project = ctx.GetRequestBody<Project>()
        do! Db.Project.asyncPartiallyUpdateProject project
        return Some { ctx with response = ctx.GetResponseWith project }
    }

let asyncOptions (ctx: HttpContext) =
    async {
        let response = ctx.GetOptionsResponseFor (SupportedHttpMethods.Project "GET, HEAD, POST, PUT, PATCH, DELETE")
        return Some { ctx with response = response }
    }

let delete (id: int64) =
    if Db.Project.existsProject id then
        Db.Project.removeProject id
        setStatus HTTP_200
    else
        setStatus HTTP_204
