[<RequireQualifiedAccess>]
module Daze.Api.PostService

open System
open Daze.Api.Services
open Daze.Api.Domain

let getAllPosts() = 
    query { 
        for p in ctx.Public.Post do
        select { Id = p.Id
                 Slug = p.Slug
                 Title = p.Title
                 Content = p.Content
                 CreatedAt = p.CreatedAt
                 ModifiedAt = p.ModifiedAt }
    } |> Seq.cache 

let getAllPostsPaginated page pageSize =
    let startIndex = (page - 1) * pageSize
    query {
        for p in ctx.Public.Post do
        skip startIndex
        take pageSize
        select { Id = p.Id
                 Slug = p.Slug
                 Title = p.Title
                 Content = p.Content
                 CreatedAt = p.CreatedAt
                 ModifiedAt = p.ModifiedAt }
    } |> Seq.cache

let findPostById (id : int64) = 
    let post = query { 
        for p in ctx.Public.Post do
        where (p.Id = id)
        exactlyOneOrDefault 
    }
    if isNull post then None
    else Some { Id = post.Id
                Slug = post.Slug
                Title = post.Title
                Content = post.Content
                CreatedAt = post.CreatedAt
                ModifiedAt = post.ModifiedAt }

let existsPost (id: int64) = 
    query {
        for p in ctx.Public.Post do
        exists (p.Id = id)
    }

let asyncInsertNewPost (post: Post) = 
    async {
        let newPost = ctx.Public.Post.Create()
        newPost.Title <- post.Title
        newPost.Slug <- post.Slug
        newPost.Content <- post.Content
        
        try 
            do! ctx.SubmitUpdatesAsync()
        with _ -> 
            ctx.GetUpdates()
            ctx.ClearUpdates()
    }
    
let asyncFullyUpdatePost (post: Post) =
    async {
        let foundPost = query {
            for p in ctx.Public.Post do
            where (p.Id = post.Id)
            exactlyOneOrDefault
        }
        if not (isNull foundPost) then
            foundPost.Title <- post.Title
            foundPost.Slug <- post.Title.Replace(" ", "-")
            foundPost.Content <- post.Content
            foundPost.ModifiedAt <- DateTime.UtcNow

        do! ctx.SubmitUpdatesAsync()
    }

let asyncPartiallyUpdatePost (post: Post) =
    async {
        let foundPost = query {
            for p in ctx.Public.Post do
            where (p.Id = post.Id)
            exactlyOneOrDefault
        }
        if not (isNull foundPost) then 
            if not (isNull post.Title) then 
                foundPost.Title <- post.Title
                
            if not (isNull post.Slug) then 
                foundPost.Slug <- post.Slug

            if not (isNull post.Content) then 
                foundPost.Content <- post.Content

            foundPost.ModifiedAt <- DateTime.UtcNow

        do! ctx.SubmitUpdatesAsync()
    }

let removePost (id: int64) = 
    async {
        let record = ctx.Public.Post.Create()
        record.Id <- id
        record.Delete()
        do! ctx.SubmitUpdatesAsync()
    } |> Async.RunSynchronously
