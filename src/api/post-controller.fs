[<RequireQualifiedAccess>]
module PostController

open System
open Suave
open Suave.Successful
open Suave.RequestErrors
open Suave.Writers
open Suave.Authentication
open Utils
open Domain
open Types

let get =
    let posts = Db.Post.getAllPosts()
    OKJson (serialize posts)

let getPaginated (page, pageSize) =
    let posts = Db.Post.getAllPostsPaginated page pageSize
    OKJson (serialize posts)

let getSingle (id: int64) =
    let post = Db.Post.findPostById id
    match post with
    | Some p -> OKJson (serialize p)
    | None -> no_content

let getPostTags (id: int64) =
    let tags = Db.Post.findTagsByPostId id
    OKJson (serialize tags)

let head (id: int64) =
    let exists = Db.Post.existsPost id
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) =
    async {
        let post = ctx.GetRequestBody<Post>()
        do! Db.Post.asyncInsertNewPost post
        return Some { ctx with response = ctx.GetResponseWith post }
    }

let asyncPut (ctx: HttpContext) =
    async {
        let post = ctx.GetRequestBody<Post>()
        do! Db.Post.asyncFullyUpdatePost post
        return Some { ctx with response = ctx.GetResponseWith post }
    }

let asyncPatch (ctx: HttpContext) =
    async {
        let post = ctx.GetRequestBody<Post>()
        do! Db.Post.asyncPartiallyUpdatePost post
        return Some { ctx with response = ctx.GetResponseWith post }
    }

let asyncOptions (ctx: HttpContext) =
    async {
        let response = ctx.GetOptionsResponseFor (SupportedHttpMethods.Post "GET, HEAD, POST, PUT, PATCH, DELETE")
        return Some { ctx with response = response }
    }

let delete (id: int64) =
    if Db.Post.existsPost id then
        Db.Post.removePost id
        setStatus HTTP_200
    else
        setStatus HTTP_204
