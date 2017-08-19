namespace Db

[<RequireQualifiedAccess>]
module Post =

    open System
    open Domain
    open BaseDb
    open Db.Mappings


    let getAllPosts () =
        query {
            for p in ctx.Public.Post do
            select { Id = p.Id
                     Slug = p.Slug
                     Title = p.Title
                     HeroContent = p.HeroContent
                     Content = p.Content
                     CoverImage = p.CoverImage
                     CreatedAt = p.CreatedAt
                     ModifiedAt = p.ModifiedAt
                     Tags = Seq.empty }
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
                     HeroContent = p.HeroContent
                     Content = p.Content
                     CoverImage = p.CoverImage
                     CreatedAt = p.CreatedAt
                     ModifiedAt = p.ModifiedAt
                     Tags = Seq.empty }
        } |> Seq.cache

    let findPostById (id : int64) =
        let post = query {
            for p in ctx.Public.Post do
            where (p.Id = id)
            exactlyOneOrDefault
        }
        let tags = Seq.cache <| query {
            for pt in ctx.Public.PostTag do
            join t in (ctx.Public.Tag) on (pt.TagId = t.Id)
            where (pt.PostId = id)
            select ({ Id = t.Id
                      TagName = t.TagName })
        }
        if (isNull post) then None
        else Some { Id = post.Id
                    Slug = post.Slug
                    Title = post.Title
                    HeroContent = post.HeroContent
                    Content = post.Content
                    CoverImage = post.CoverImage
                    CreatedAt = post.CreatedAt
                    ModifiedAt = post.ModifiedAt
                    Tags = tags }

    let findTagsByPostId (id: int64) =
        let tags = Seq.cache <| query {
            for pt in ctx.Public.PostTag do
            join t in (ctx.Public.Tag) on (pt.TagId = t.Id)
            where (pt.PostId = id)
            select ({ Id = t.Id
                      TagName = t.TagName })
        }
        tags


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
            newPost.HeroContent <- post.HeroContent
            newPost.Content <- post.Content
            newPost.CoverImage <- post.CoverImage

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
                foundPost.Slug <- post.Title.Replace(" ", "-") // todo all -
                foundPost.HeroContent <- post.HeroContent
                foundPost.Content <- post.Content
                foundPost.ModifiedAt <- Some DateTime.UtcNow
                foundPost.CoverImage <- post.CoverImage

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
                foundPost.Title <- post.Title
                foundPost.Slug <- post.Slug
                foundPost.ModifiedAt <- Some DateTime.UtcNow

                if post.HeroContent.IsSome then
                    foundPost.HeroContent <- post.HeroContent

                if post.Content.IsSome then
                    foundPost.Content <- post.Content

                if post.CoverImage.IsSome then
                    foundPost.CoverImage <- post.CoverImage

            do! ctx.SubmitUpdatesAsync()
        }

    let removePost (id: int64) =
        async {
            let record = ctx.Public.Post.Create()
            record.Id <- id
            record.Delete()
            do! ctx.SubmitUpdatesAsync()
        } |> Async.RunSynchronously



