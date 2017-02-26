[<RequireQualifiedAccess>]
module Daze.Api.AuthenticationController

open Suave
open Suave.Operators
open Suave.Successful
open Suave.Authentication
open Daze.Api.Utils



// user = "hermesxgjini@gmail.com" && pwd = "bar") 
let authenticate =
    Authentication.authenticateBasic 
        (AuthenticationService.authenticate)
        (OK (sprintf "Hello authenticated person "))


