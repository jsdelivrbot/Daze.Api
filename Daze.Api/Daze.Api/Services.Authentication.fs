[<RequireQualifiedAccess>]
module Daze.Api.AuthenticationService

open System
open Daze.Api.Services

type TResult = {
    new_id: string
    success:string
    message: string
}

let authenticate (username: string, password: string) = 
    printfn "%s %s" username password
    let authenticationResult =  ctx.Functions.Authenticate.Invoke(username, password, "local")
    printfn "%A" authenticationResult.ReturnValue
    authenticationResult.ReturnValue



