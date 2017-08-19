module Tests

open System
open System.Text
open System.Net
open System.Net.Http
open Suave
open Suave.Testing
open Suave.Successful
open Expecto
open Api
open System.Threading
open Suave.Logging


let runWithConfig = runWith Web.defaultConfig app

let unAuthorizedMessage = "api is not authorized"

// [<Tests>]
let firstTest =
    testCase "post GET should not be authorized" <| fun () ->
        let httpStatus = runWithConfig |> reqStatusCode GET "/api/post/" None
        Expect.equal httpStatus HttpStatusCode.OK "first "

// [<Tests>]
let secondTest =
    testCase "project GET should not be authorized" <| fun ()  ->
        let httpStatus = runWithConfig |> reqStatusCode GET "/api/project/" None
        Expect.equal httpStatus HttpStatusCode.OK "second "
