[<RequireQualifiedAccess>]
module Daze.Api.PostService

open Daze.Api.Services
open Daze.Api.Domain

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

let insertNewPost (p: Post) = 
    let newPost = ctx.Public.Post.Create()
    newPost.Title <- p.Title
    newPost.Slug <- p.Slug
    newPost.Content <- p.Content
    ctx.SubmitUpdates()