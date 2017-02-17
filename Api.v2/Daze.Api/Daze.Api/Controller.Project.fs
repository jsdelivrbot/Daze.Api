[<RequireQualifiedAccess>]
module Daze.Api.ProjectController

open Suave
open Suave.Writers
open Daze.Api.JsonHelper
open Daze.Api.Utils

let get = 
    let projects = ProjectService.getAllProjects()
    OKJson (serialize projects)

let getSingle (id: int64) = 
    let project = ProjectService.findProjectById id
    OKJson (serialize project)

let head (id: int64) =
    let exists = ProjectService.existsProject id
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) = 
    async {
        let requestBody = ctx.request.rawForm
        let project = deserialize requestBody

        do! ProjectService.insertNewProject project
        let response = {
            ctx.response with 
                content = Bytes (serialize project)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }


let asyncPut (ctx: HttpContext) = 
    async { 
        let requestBody = ctx.request.rawForm
        let project = deserialize requestBody 

        do! ProjectService.asyncFullyUpdateProject project
        let response = {
            ctx.response with 
                content = Bytes (serialize project)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }

let asyncPatch (ctx: HttpContext) =
    async {
        let requestBody = ctx.request.rawForm
        let project = deserialize requestBody

        do! ProjectService.asyncPartiallyUpdateProject project
        let response = {
            ctx.response with 
                content = Bytes (serialize project)
                headers = [("content-type", "application/json")]
        }
        return Some { ctx with response = response }
    }

let delete (id: int64) =
    ProjectService.removeProject id
    setStatus HTTP_200


