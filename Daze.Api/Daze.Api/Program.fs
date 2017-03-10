module Daze.Api.Program

open System
open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open Daze.Api.Utils
open System.Reflection
open FSharp.Linq
open System.Reflection

type Method = HttpMethod

let defaultCorsConfig = {
    allowedUris = InclusiveOption.Some [
                    "http://localhost:3000" ]
    allowedMethods = InclusiveOption.Some [
                        Method.GET
                        Method.HEAD
                        Method.POST
                        Method.DELETE
                        Method.OPTIONS
                        Method.PUT
                        Method.PATCH ]
    allowCookies = true
    maxAge = Some(Int32.MaxValue)
    exposeHeaders = false }

let app =
    choose [
        GET >=> path "/" >=> (OK "__daze_api__")

        POST >=> path "/api/authenticate/" >=> AuthenticationController.authenticate 
        GET >=> path "/api/cookies/" >=> AuthenticationController.getCookies

        GET >=> path "/api/post/" >=> PostController.get
        GET >=> pathScan "/api/post/%i" PostController.getSingle
        GET >=> pathScan "/api/post/%i/%i" PostController.getPaginated
        HEAD >=> pathScan "/api/post/%i" PostController.head
        POST >=> path "/api/post/" >=> PostController.asyncPost
        PUT >=> path "/api/post/" >=> PostController.asyncPut 
        PATCH >=> path "/api/post/" >=> PostController.asyncPatch
        DELETE >=> pathScan "/api/post/%i" PostController.delete
        OPTIONS >=> path "/api/post/" >=> PostController.asyncOptions

        GET >=> path "/api/skill/" >=> SkillController.get
        GET >=> pathScan "/api/skill/%i" SkillController.getSingle
        HEAD >=> pathScan "/api/skill/%i" SkillController.head
        POST >=> path "/api/skill/" >=> SkillController.asyncPost
        PUT >=> path "/api/skill/" >=> SkillController.asyncPut
        PATCH >=> path "/api/skill/" >=> SkillController.asyncPatch
        DELETE >=> pathScan "/api/skill/%i" SkillController.delete
        OPTIONS >=> path "/api/skill/" >=> SkillController.asyncOptions

        GET >=> path "/api/project/" >=> ProjectController.get 
        GET >=> pathScan "/api/project/%i" ProjectController.getSingle
        HEAD >=> pathScan "/api/project/%i" ProjectController.head
        POST >=> path "/api/project/" >=> ProjectController.asyncPost
        PUT >=> path "/api/project/" >=> ProjectController.asyncPut
        PATCH >=> path "/api/project/" >=> ProjectController.asyncPatch 
        DELETE >=> pathScan "/api/project/%i" ProjectController.delete
        OPTIONS >=> path "/api/project/" >=> ProjectController.asyncOptions

        NOT_FOUND "you are lost"
    ] >=> (cors defaultCorsConfig)

let printHero () =
    let currentAssembly = Assembly.GetExecutingAssembly()
                                  .GetName()
    let version = currentAssembly.Version.ToString()
    let name = currentAssembly.Name.ToString()
    printfn "%s: %s" name version

[<EntryPoint>]
let main argv =
    // printHero() |> ignore
    startWebServer defaultConfig app
    0  // exit of program