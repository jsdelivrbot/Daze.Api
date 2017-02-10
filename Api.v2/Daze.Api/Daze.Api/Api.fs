module Daze.Api.Program

open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open JsonHelper
open Daze.Api.Utils

let posts = Services.getPosts()
let skills = Services.getSkills()
let projects = Services.getSkills()

let homeWebPart = (OK "hello world")
let postWebPart = (OKJson (serialize posts))
let skillWebPart = (OKJson (serialize skills))
let projectWebPart =(OKJson (serialize projects))



let app =
    choose [
        GET >=> path "/" >=> homeWebPart
        GET >=> path "/api/post/" >=> postWebPart >=> (cors defaultCorsConfig)
        GET >=> path "/api/skill/" >=> skillWebPart >=> (cors defaultCorsConfig)
        GET >=> path "/api/project" >=> projectWebPart >=> (cors defaultCorsConfig)
        // GET >=> pathScan "/test/%s/%i" helloWorld3Part
        NOT_FOUND "you are lost"
    ]
    

[<EntryPoint>]
let main argv =
    startWebServer defaultConfig app
    0  // exit of program