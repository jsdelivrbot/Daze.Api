module Daze.Api.Program

open System
open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open Daze.Api.Utils

let defaultCorsConfig = {
    allowedUris = InclusiveOption.All
    allowedMethods = InclusiveOption.All
    maxAge = Some(1)
    allowCookies = false
    exposeHeaders = true }

let app =
    choose [
        GET >=> path "/" >=> (OK "__daze_api__")
        POST >=> path "/api/authenticate/" >=> AuthenticationController.authenticate 
        GET >=> path "/api/post/" >=> PostController.get
        GET >=> pathScan "/api/post/%i" PostController.getSingle
        GET >=> pathScan "/api/post/%i/%i" PostController.getPaginated
        HEAD >=> pathScan "/api/post/%i" PostController.head
        POST >=> path "/api/post/" >=> PostController.asyncPost
        PUT >=> path "/api/post/" >=> PostController.asyncPut
        PATCH >=> path "/api/post/" >=> PostController.asyncPatch
        DELETE >=> pathScan "/api/post/%i" PostController.delete

        GET >=> path "/api/skill/" >=> SkillController.get
        GET >=> pathScan "/api/skill/%i" SkillController.getSingle
        HEAD >=> pathScan "/api/skill/%i" SkillController.head
        POST >=> path "/api/skill/" >=> SkillController.asyncPost
        PUT >=> path "/api/skill/" >=> SkillController.asyncPut
        PATCH >=> path "/api/skill/" >=> SkillController.asyncPatch
        DELETE >=> pathScan "/api/skill/%i" SkillController.delete

        GET >=> path "/api/project/" >=> ProjectController.get 
        GET >=> pathScan "/api/project/%i" ProjectController.getSingle
        HEAD >=> pathScan "/api/project/%i" ProjectController.head
        POST >=> path "/api/project/" >=> ProjectController.asyncPost
        PUT >=> path "/api/project/" >=> ProjectController.asyncPut
        PATCH >=> path "/api/project/" >=> ProjectController.asyncPatch 
        DELETE >=> pathScan "/api/project/%i" ProjectController.delete

        NOT_FOUND "you are lost"
    ] >=> (cors defaultCorsConfig)


[<EntryPoint>]
let main argv =
    startWebServer defaultConfig app
    0  // exit of program