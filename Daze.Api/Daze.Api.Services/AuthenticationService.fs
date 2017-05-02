[<RequireQualifiedAccess>]
module Daze.Api.AuthenticationService

open System
open Daze.Api.Domain
open Daze.Api.BaseService

type TResult = {
    new_id: string
    success: string
    message: string
    password: string
}

let authenticate (username: string, password: string) =
    let authenticationResult =  ctx.Functions.Authenticate.Invoke(username, password, "local_login")
    authenticationResult.ReturnValue.[0].GetColumn("success") = true

let login (loginModel: LoginModel) =
    let authenticationResult = ctx.Functions.Authenticate.Invoke(loginModel.username, loginModel.password, "local").ReturnValue.[0]
    let result = {
        new_id= authenticationResult.GetColumn("new_id")
        success= authenticationResult.GetColumn("success")
        message= authenticationResult.GetColumn("message")
        password = authenticationResult.GetColumn("password")
    }
    printfn "pwd:=>  %A" result
    result

    
