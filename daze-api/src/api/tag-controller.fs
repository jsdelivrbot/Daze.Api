[<RequireQualifiedAccess>]
module TagController

open Suave
open Suave.Successful
open Suave.Writers
open Domain
open Utils

let get =
    let tags = TagService.getAllTags()
    OKJson (serialize tags)


let getSingle (id: int64) =
    let tag = TagService.findTagById id
    match tag with
    | Some t -> OKJson (serialize t)
    | None -> no_content

let getPaginated (page, pageSize) =
    let tags = TagService.getAllTagsPaginated page pageSize
    OKJson (serialize tags)

let head (id: int64) =
    let exists = TagService.existsTag id
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) =
    async {
        let tag = ctx.GetRequestBody<Tag>()
        do! TagService.asyncInsertNewTag tag
        return Some { ctx with response = ctx.GetResponseWith tag }
    }

let asyncPut (ctx: HttpContext) =
    async {
        let tag = ctx.GetRequestBody<Tag>()
        do! TagService.asyncFullyUpdateTag tag
        return Some { ctx with response = ctx.GetResponseWith tag }
    }

let asyncPatch (ctx: HttpContext) =
    async {
        let tag = ctx.GetRequestBody<Tag>()
        printfn "%A" tag
        do! TagService.asyncPartiallyUpdateTag tag
        return Some { ctx with response = ctx.GetResponseWith tag }
    }

let asyncOptions (ctx: HttpContext) =
    async {
        let response = ctx.GetOptionsResponseFor (SupportedHttpMethods.Tag "GET, HEAD, POST, PUT, PATCH, DELETE")
        return Some { ctx with response = response }
    }

let delete (id: int64) =
    if TagService.existsTag id then
        TagService.removeTag id
        setStatus HTTP_200
    else
        setStatus HTTP_204
