[<RequireQualifiedAccess>]
module Daze.Api.PostController

open Suave
open Suave.Successful
open Suave.RequestErrors
open Suave.Writers
open JsonHelper
open Daze.Api.Utils
open Daze.Api.Domain


let get =
    let posts = PostService.getAllPosts()
    OKJson (serialize posts)

let getSingle (id: int64) =
    let post = PostService.findPostById id
    OKJson (serialize post)

let head (id: int64) =
    let exists = PostService.existsPost id 
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) =
    async {
        let requestBody = ctx.request.rawForm
        let post: Post = deserialize requestBody 
        do! PostService.insertNewPost post
        let response = {
            ctx.response with 
                content = Bytes (serialize post)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }

let asyncPut (ctx: HttpContext) =
    async {
        let requestBody = ctx.request.rawForm
        let post: Post = deserialize requestBody
        do! PostService.fullyUpdatePost post
        let response = {
            ctx.response with
                content = Bytes (serialize post)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response } 
    }

let asyncPatch (ctx: HttpContext) =
    async {
        let requestBody = ctx.request.rawForm
        let post: Post = deserialize requestBody
        do! PostService.partiallyUpdatePost post
        let response = {
            ctx.response with 
                content = Bytes (serialize post)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }

let delete (id: int64) =
    PostService.removePost id
    setStatus HTTP_200
