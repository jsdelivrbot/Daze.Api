[<RequireQualifiedAccess>]
module Daze.Api.AuthenticationController

open Suave
open Suave.Operators
open Suave.Successful
open Suave.Authentication
open Suave.Cookie
open Daze.Api.Utils
open Suave.State.CookieStateStore


// user = "hermesxgjini@gmail.com" && pwd = "bar") 
let authenticate =
    authenticateBasic 
        (AuthenticationService.authenticate)
        (OKJson (serialize true))
        >=> authenticated Cookie.CookieLife.Session false
        >=> statefulForSession
        >=> sessionStore (fun store ->
            store.set "username" "lolz" )


let getCookies =
    sessionGet (fun store ->
        let cok = store.get "username"
        match cok with 
        | Some r -> (OKJson (serialize r))
        | None -> never
    )



