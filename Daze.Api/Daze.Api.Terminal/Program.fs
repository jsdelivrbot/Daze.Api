module Daze.Api.Program

open System
open FSharp.Linq
open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open Suave.Authentication
open Daze.Api.Utils

type HTTP = HttpMethod

let defaultCorsConfig = {
    allowedUris = InclusiveOption.Some [
                    "http://localhost:3000" ]
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
    exposeHeaders = true }

let authorize = 
    authenticateBasic (AuthenticationService.authenticate)

// all mutable apis are need authentication
let app =
    choose [
        GET >=> path "/" >=> (OK "__daze_api__")
        GET >=> path "/api/version/" >=> VersionController.getVersion
        POST >=> path "/api/login/" >=> AuthenticationController.login
        GET >=> path "/api/cookies/" >=> AuthenticationController.getCookies

        GET >=> path "/api/post/" >=> PostController.get
        GET >=> pathScan "/api/post/%i" PostController.getSingle
        GET >=> pathScan "/api/post/%i/tag" PostController.getPostTags
        GET >=> pathScan "/api/post/%i/%i" PostController.getPaginated
        HEAD >=> pathScan "/api/post/%i" PostController.head
        OPTIONS >=> path "/api/post/" >=> PostController.asyncOptions

        GET >=> path "/api/tag/" >=> TagController.get
        GET >=> pathScan "/api/tag/" TagController.getSingle

        GET >=> path "/api/skill/" >=> SkillController.get
        GET >=> pathScan "/api/skill/%i" SkillController.getSingle
        HEAD >=> pathScan "/api/skill/%i" SkillController.head        
        OPTIONS >=> path "/api/skill/" >=> SkillController.asyncOptions

        GET >=> path "/api/project/" >=> ProjectController.get
        GET >=> pathScan "/api/project/%i" ProjectController.getSingle
        HEAD >=> pathScan "/api/project/%i" ProjectController.head
        OPTIONS >=> path "/api/project/" >=> ProjectController.asyncOptions

        authorize <| choose [
            POST >=> path "/api/authenticate/" >=> AuthenticationController.authenticate

            POST >=> path "/api/post/" >=> PostController.asyncPost
            PUT >=> path "/api/post/" >=> PostController.asyncPut
            PATCH >=> path "/api/post/" >=> PostController.asyncPatch
            DELETE >=> pathScan "/api/post/%i" PostController.delete

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


[<EntryPoint>]
let main argv =
    VersionController.getVersionTuple() |> fun (name, version) -> printfn "%s %s " name version
    startWebServer defaultConfig app
    0  // exit of program
