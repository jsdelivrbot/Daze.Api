module Daze.Api.Program

open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open Daze.Api.Utils


let app =
    choose [
        GET >=> path "/" >=> (OK "__daze_api__")
        GET >=> path "/api/post/" >=> PostController.get
        GET >=> pathScan "/api/post/%i" PostController.getSingle
        HEAD >=> pathScan "/api/post/%i" PostController.head
        POST >=> path "/api/post/" >=> PostController.asyncPost
        PUT >=> path "/api/post/" >=> PostController.asyncPut
        PATCH >=> path "/api/post/" >=> PostController.asyncPatch
        DELETE >=> pathScan "/api/post/%i" PostController.delete

        GET >=> path "/api/skill/" >=> SkillController.get
        GET >=> pathScan "/api/skill/%i" SkillController.getSingle
        HEAD >=> pathScan "/api/skill/%i" SkillController.head

        NOT_FOUND "you are lost"
    ] >=> (cors defaultCorsConfig)


[<EntryPoint>]
let main argv =
    startWebServer defaultConfig app
    0  // exit of program