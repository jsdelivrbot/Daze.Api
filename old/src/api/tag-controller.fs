namespace Api

[<RequireQualifiedAccess>]
module TagController =

    open Suave
    open Suave.Successful
    open Suave.Writers
    open Domain
    open Api.Utils
    open Api.Types
    open Persistance

    let get =
        let tags = Db.Tag.getAllTags()

        let links = {
            Self = { href = "/api/tag/" }
            Next = { href = "/api/tag/2/" } }

        let hal = {
            totalCount = Seq.length tags
            _links = links
            _embedded = Items(tags) }

        OKJson (serialize hal)

    let getSingle (id: int64) =
        let tag = Db.Tag.findTagById id

        let links = {
            Self = { href = sprintf "/api/tag/%i" id }
            Next = { href = null } }

        let hal = {
            totalCount = if tag.IsNone then 0 else 1
            _links = links
            _embedded = Item(tag) }

        OKJson (serialize hal)


    let getPaginated (page, pageSize) =
        let tags = Db.Tag.getAllTagsPaginated page pageSize

        let links = {
            Self = { href = sprintf "/api/tag/%i/%i" page pageSize }
            Next = { href = sprintf "/api/tag/%i/%i" (page+1) pageSize } }

        let hal = {
            totalCount = Seq.length tags
            _links = links
            _embedded = Items(tags) }

        OKJson (serialize hal)

    let head (id: int64) =
        let exists = Db.Tag.existsTag id
        if exists then setStatus HTTP_200
        else setStatus HTTP_404

    let asyncPost (ctx: HttpContext) =
        async {
            let tag = ctx.GetRequestBody<Tag>()
            do! Db.Tag.asyncInsertNewTag tag
            return Some { ctx with response = ctx.GetResponseWith tag }
        }

    let asyncPut (ctx: HttpContext) =
        async {
            let tag = ctx.GetRequestBody<Tag>()
            do! Db.Tag.asyncFullyUpdateTag tag
            return Some { ctx with response = ctx.GetResponseWith tag }
        }

    let asyncPatch (ctx: HttpContext) =
        async {
            let tag = ctx.GetRequestBody<Tag>()
            printfn "%A" tag
            do! Db.Tag.asyncPartiallyUpdateTag tag
            return Some { ctx with response = ctx.GetResponseWith tag }
        }

    let asyncOptions (ctx: HttpContext) =
        async {
            let response = ctx.GetOptionsResponseFor (SupportedHttpMethods.Tag "GET, HEAD, POST, PUT, PATCH, DELETE")
            return Some { ctx with response = response }
        }

    let delete (id: int64) =
        if Db.Tag.existsTag id then
            Db.Tag.removeTag id
            setStatus HTTP_200
        else
            setStatus HTTP_204
