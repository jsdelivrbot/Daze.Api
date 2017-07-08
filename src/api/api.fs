module Api

open System
open System.Net
open FSharp.Linq
open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open Suave.Authentication
open Utils

type HTTP = HttpMethod

let defaultCorsConfig = {
    allowedUris = InclusiveOption.Some [
                        "http://localhost:3000"
                        "http://localhost:5000"
                        "https://daze-spa.herokuapp.com"
                        "https://afractal.herokuapp.com"
                        "http://afractal.herokuapp.com" ]
    allowedMethods = InclusiveOption.Some [
                        HTTP.GET
                        HTTP.HEAD
                        HTTP.POST
                        HTTP.PUT
                        HTTP.PATCH
                        HTTP.DELETE
                        HTTP.OPTIONS ]
    allowCookies = true
    maxAge = Some(Int32.MaxValue)
    exposeHeaders = InclusiveOption.All }

let authorize =
    authenticateBasic (AuthService.authenticate)

// all non-idempotent apis need authentication
let app =
    choose [
        GET >=> path "/" >=> (OK "__daze_api__")
        GET >=> path "/api/version/" >=> VersionController.getVersion
        POST >=> path "/api/login/" >=> AuthController.login
        GET >=> path "/api/cookies/" >=> AuthController.getCookies

        GET >=> path "/api/post/" >=> PostController.get
        GET >=> pathScan "/api/post/%i" PostController.getSingle
        GET >=> pathScan "/api/post/%i/tag" PostController.getPostTags
        GET >=> pathScan "/api/post/%i/%i" PostController.getPaginated
        HEAD >=> pathScan "/api/post/%i" PostController.head
        OPTIONS >=> path "/api/post/" >=> PostController.asyncOptions

        GET >=> path "/api/tag/" >=> TagController.get
        GET >=> pathScan "/api/tag/%i" TagController.getSingle
        GET >=> pathScan "/api/tag/%i/%i" PostController.getPaginated
        HEAD >=> pathScan "/api/tag/%i" PostController.head
        OPTIONS >=> path "/api/tag/" >=> TagController.asyncOptions

        GET >=> path "/api/skill/" >=> SkillController.get
        GET >=> pathScan "/api/skill/%i" SkillController.getSingle
        HEAD >=> pathScan "/api/skill/%i" SkillController.head
        OPTIONS >=> path "/api/skill/" >=> SkillController.asyncOptions

        GET >=> path "/api/project/" >=> ProjectController.get
        GET >=> pathScan "/api/project/%i" ProjectController.getSingle
        HEAD >=> pathScan "/api/project/%i" ProjectController.head
        OPTIONS >=> path "/api/project/" >=> ProjectController.asyncOptions

        authorize <| choose [
            POST >=> path "/api/authenticate/" >=> AuthController.authenticate

            POST >=> path "/api/post/" >=> PostController.asyncPost
            PUT >=> path "/api/post/" >=> PostController.asyncPut
            PATCH >=> path "/api/post/" >=> PostController.asyncPatch
            DELETE >=> pathScan "/api/post/%i" PostController.delete

            POST >=> path "/api/tag/" >=> TagController.asyncPost
            PUT >=> path "/api/tag/" >=> TagController.asyncPut
            PATCH >=> path "/api/tag/" >=> TagController.asyncPatch
            DELETE >=> pathScan "/api/tag/%i" TagController.delete

            POST >=> path "/api/skill/" >=> SkillController.asyncPost
            PUT >=> path "/api/skill/" >=> SkillController.asyncPut
            PATCH >=> path "/api/skill/" >=> SkillController.asyncPatch
            DELETE >=> pathScan "/api/skill/%i" SkillController.delete

            POST >=> path "/api/project/" >=> ProjectController.asyncPost
            PUT >=> path "/api/project/" >=> ProjectController.asyncPut
            PATCH >=> path "/api/project/" >=> ProjectController.asyncPatch
            DELETE >=> pathScan "/api/project/%i" ProjectController.delete
        ]

        NOT_FOUND "you are lost"
    ] >=> (cors defaultCorsConfig)

let serverConfig =
    let port = int (Environment.GetEnvironmentVariable("PORT"))
    let port = 8080
    { Web.defaultConfig with
          homeFolder = Some __SOURCE_DIRECTORY__
        //   bindings = [ HttpBinding.createSimple HTTP "127.0.0.1" port ] }
          bindings = [ HttpBinding.createSimple HTTP "0.0.0.0" port ] }

[<EntryPoint>]
let main argv =
    printfn "starting server..."
    VersionController.getVersionTuple() |> fun (name, version) -> printfn "%s %s" name version
    startWebServer serverConfig app
    printfn "exiting server..."
    0  // exit of program
