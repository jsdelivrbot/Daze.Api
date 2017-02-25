[<RequireQualifiedAccess>]
module Daze.Api.AuthenticationController

open Suave
open Daze.Api.Utils


type LoginModel = {
    username: string
    password: string }


let authenticate (ctx: HttpContext) = 
    async {
        let loginModel = ctx.GetRequestBody<LoginModel>()
        let result = AuthenticationService.authenticate (loginModel.username, loginModel.password)
        return Some { ctx with response = ctx.GetResponseWith result }
    }
    