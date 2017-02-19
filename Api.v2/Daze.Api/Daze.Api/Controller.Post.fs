﻿[<RequireQualifiedAccess>]
module Daze.Api.PostController

open System
open Suave
open Suave.Successful
open Suave.RequestErrors
open Suave.Writers
open Daze.Api.Utils
open Daze.Api.Domain


let get =
    let posts = PostService.getAllPosts()
    match posts with
    | Some ps -> OKJson (serialize ps)
    | None -> no_content

let getSingle (id: int64) =
    let post = PostService.findPostById id
    match post with 
    | Some p -> OKJson (serialize p)
    | None -> no_content

let head (id: int64) =
    let exists = PostService.existsPost id 
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) =
    async {
        let post = ctx.GetRequestBody()
        do! PostService.asyncInsertNewPost post
        return Some { ctx with response = ctx.GetResponseWith post }
    }

let asyncPut (ctx: HttpContext) =
    async {
        let post = ctx.GetRequestBody<Post>()
        do! PostService.asyncFullyUpdatePost post
        return Some { ctx with response = ctx.GetResponseWith post } 
    }
    
let asyncPatch (ctx: HttpContext) =
    async {
        let post = ctx.GetRequestBody<Post>()
        do! PostService.asyncPartiallyUpdatePost post
        return Some { ctx with response = ctx.GetResponseWith post }
    }

let delete (id: int64) =
    if PostService.existsPost id then
        PostService.removePost id
        setStatus HTTP_200
    else 
        setStatus HTTP_204
