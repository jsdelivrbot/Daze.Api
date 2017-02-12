module Daze.Api.Program

open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open JsonHelper
open Daze.Api.Utils

let homeWebPart = (OK "welcome: daze api")


(* post apis *)
let GETPostWebPart = 
    let posts = PostService.getAllPosts()
    OKJson (serialize posts)

let GETSinglePostWebPart (id: int64) =
    let post = PostService.findPostById id
    OKJson (serialize post)

let POSTPostWebPart (ctx: HttpContext) =
    async {
        let requestBody = ctx.request.rawForm

        let post: Daze.Api.Domain.Post = deserialize requestBody
        printfn "%A" post 
        let result = PostService.insertNewPost post
        let response = {
            ctx.response with 
                content = HttpContent.Bytes (serialize result)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }

let app =
    choose [
        GET >=> path "/" >=> homeWebPart
        GET >=> path "/api/post/" >=> GETPostWebPart
        POST >=> path "/api/post/" >=> POSTPostWebPart
        GET >=> pathScan "/api/post/%i" GETSinglePostWebPart
        NOT_FOUND "you are lost"
    ] >=> (cors defaultCorsConfig)

[<EntryPoint>]
let main argv =
    startWebServer defaultConfig app
    0  // exit of program
