[<RequireQualifiedAccess>]
module Daze.Api.AuthenticationController

open System
open Suave
open Suave.Operators
open Suave.Successful
open Suave.Authentication
open Suave.Cookie
open Suave.State.CookieStateStore
open Daze.Api.Domain
open Daze.Api.Utils

// authenticateBasic ((=) ("hermesgjini@gmail.com", "mnbvcxz"))

let authenticate = 
    //authenticateBasic 
    //    (AuthenticationService.authenticate)
    (OKJson (serialize true)) // can`t be reached if the user is unauthorized



let login (ctx: HttpContext) = 
    async {
        let loginModel = ctx.GetRequestBody<LoginModel>()
        let loginResult = AuthenticationService.login loginModel
        return Some { ctx with response = ctx.GetResponseWith loginResult } 
    }
let getCookies =
    sessionGet (fun store ->
        let cok = store.get "username"
        match cok with 
        | Some r -> (OKJson (serialize r))
        | None -> never
    )

