namespace Api

[<RequireQualifiedAccess>]
module PostController =

    open System
    open Suave
    open Suave.Successful
    open Suave.RequestErrors
    open Suave.Writers
    open Suave.Authentication
    open Domain
    open Api.Utils
    open Api.Types
    open Persistance

    let get =
        let posts = Db.Post.getAllPosts()

        let links = {
            Self = { href = "/api/post/" }
            Next = { href = "/api/post/2/2" } }

        let hal = {
            totalCount = Seq.length posts
            _links = links
            _embedded = Items(posts) }

        OKJson (serialize hal)

    let getPaginated (page, pageSize) =
        let posts = Db.Post.getAllPostsPaginated page pageSize

        let links = {
            Self = { href = sprintf "/api/post/%i/%i" page pageSize }
            Next = { href = sprintf "/api/post/%i/%i" (page + 1) pageSize } }

        let hal = {
            totalCount = Seq.length posts
            _links = links
            _embedded = Items(posts) }

        OKJson (serialize hal)

    let getSingle (id: int64) =
        let post = Db.Post.findPostById id

        let links = {
            Self = { href = sprintf "/api/post/%i" id }
            Next = { href = null } }

        let hal = {
            totalCount = if post.IsNone then 0 else 1
            _links = links
            _embedded = Item(post) }

        OKJson (serialize hal)

    let getSingleBySlug (slug: string) =
        let post = Db.Post.findPostBySlug slug

        let links = {
            Self = { href = sprintf "/api/post/%s" slug }
            Next = { href = null } }

        let hal = {
            totalCount = if post.IsNone then 0 else 1
            _links = links
            _embedded = Item(post) }

        OKJson (serialize hal)

    let getPostTags (id: int64) =
        let tags = Db.Post.findTagsByPostId id

        let links = {
            Self = { href = sprintf "/api/post/%i/tags" id }
            Next = { href = null } }

        let hal = {
            totalCount = Seq.length tags
            _links = links
            _embedded = Items(tags) }

        OKJson (serialize hal)

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
