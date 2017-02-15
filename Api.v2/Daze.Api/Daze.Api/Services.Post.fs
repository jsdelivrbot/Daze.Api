[<RequireQualifiedAccess>]
module Daze.Api.PostService

open System
open Daze.Api.Services
open Daze.Api.Domain
open Microsoft.FSharp.Control
let getAllPosts() = 
    query { 
        for p in ctx.Public.Post do
        take 100
        select { Id = p.Id
                 Slug = p.Slug
                 Title = p.Title
                 Content = p.Content
                 CreatedAt = p.CreatedAt
                 ModifiedAt = p.ModifiedAt }
    }
    // |> Seq.cache

let findPostById (id : int64) = 
    query { 
        for p in ctx.Public.Post do
        where (p.Id = id)
        select { Id = p.Id
                 Slug = p.Slug
                 Title = p.Title
                 Content = p.Content
                 CreatedAt = p.CreatedAt
                 ModifiedAt = p.ModifiedAt }
        head
    }

let existsPost (id: int64) = 
    query {
        for p in ctx.Public.Post do
        where (p.Id = id)
    }
    |> Seq.isEmpty 
    |> not

let insertNewPost (post: Post) = 
    async {
        let newPost = ctx.Public.Post.Create()
        newPost.Title <- post.Title
        newPost.Slug <- post.Slug
        newPost.Content <- post.Content
        newPost.ModifiedAt <- post.ModifiedAt
        newPost.CreatedAt <- post.CreatedAt
        do! ctx.SubmitUpdatesAsync()
    }

let fullyUpdatePost (post: Post) =
    async {
        query {
            for p in ctx.Public.Post do
            where (p.Id = post.Id)
        }
        |> Seq.iter(fun p ->
            p.Title <- post.Title
            p.Slug <- post.Slug
            p.Content <- post.Content
            p.ModifiedAt <- DateTime.Now
        )
        do! ctx.SubmitUpdatesAsync()
    }

let partiallyUpdatePost (post: Post) =
    async {
        query {
            for p in ctx.Public.Post do
            where (p.Id = post.Id)
        }
        |> Seq.iter (fun p ->
            if not (isNull post.Title) then p.Title <- post.Title
            if not (isNull post.Slug) then p.Slug <- post.Slug
            if not (isNull post.Content) then p.Content <- post.Content
            p.ModifiedAt <- DateTime.UtcNow
        )
        do! ctx.SubmitUpdatesAsync()
    }

let removePost (id: int64) = 
    async {
        let record = ctx.Public.Post.Create()
        record.Id <- id
        record.Delete()
        do! ctx.SubmitUpdatesAsync()
    } |> Async.RunSynchronously
