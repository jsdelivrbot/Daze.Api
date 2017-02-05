module Daze.Api.Program

open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open JsonHelper

let posts = Services.getPosts()



let helloWorldPart = (OK "hello world")
let postsWebPart = (serialize posts)

let OKJson (ctx: HttpContext) =
    async {
        let responseBytes = posts//System.Text.Encoding.UTF8.GetBytes("hello world")
        let headers = [("content-type","application/json")]
        let response = {
            ctx.response with 
                content = Bytes responseBytes; 
                headers = headers;
                status = { code = 200; reason = "for reason" }
        }
        return (Some { ctx with response = response })
    }

let defaultCorsConfig = {
    allowedUris = InclusiveOption.All
    allowedMethods = InclusiveOption.All
    maxAge = Some(1)
    allowCookies = false
    exposeHeaders = true }

let app =
    choose [
        GET >=> path "/" >=> helloWorldPart
        GET >=> path "/api/posts/" >=> (OKJson) >=> cors defaultCorsConfig
        // GET >=> pathScan "/test/%s/%i" helloWorld3Part
        NOT_FOUND "you are lost"
    ]
    


[<EntryPoint>]
let main argv =
    startWebServer defaultConfig app
    0  // exit of program