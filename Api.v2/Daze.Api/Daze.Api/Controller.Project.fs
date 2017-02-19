[<RequireQualifiedAccess>]
module Daze.Api.ProjectController

open Suave
open Suave.Successful
open Suave.Writers
open Daze.Api.Utils
open Daze.Api.Domain

let get = 
    let projects = ProjectService.getAllProjects()
    match projects with 
    | Some ps -> OKJson (serialize projects)
    | None -> no_content
    
let getSingle (id: int64) = 
    let project = ProjectService.findProjectById id
    match project with 
    | Some p -> OKJson (serialize project)
    | None -> no_content
    
let head (id: int64) =
    let exists = ProjectService.existsProject id
    if exists then setStatus HTTP_200
    else setStatus HTTP_204

let asyncPost (ctx: HttpContext) = 
    async {
        let project = ctx.GetRequestBody<Project>()
        do! ProjectService.insertNewProject project
        return Some { ctx with response = ctx.GetResponseWith project }
    }

let asyncPut (ctx: HttpContext) = 
    async { 
        let project = ctx.GetRequestBody()
        do! ProjectService.asyncFullyUpdateProject project
        return Some { ctx with response = ctx.GetResponseWith project }
    }

let asyncPatch (ctx: HttpContext) =
    async {
        let project = ctx.GetRequestBody<Project>()
        do! ProjectService.asyncPartiallyUpdateProject project
        return Some { ctx with response = ctx.GetResponseWith project }
    }

let delete (id: int64) =
    if ProjectService.existsProject id then
        ProjectService.removeProject id
        setStatus HTTP_200
    else 
        setStatus HTTP_204