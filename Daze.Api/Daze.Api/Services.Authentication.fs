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
    let authenticationResult = ctx.Functions.Authenticate.Invoke(username, password, "local")
    query {
        for i in (authenticationResult.ReturnValue) do
        select i.ColumnValues
    } 
    |> Seq.collect (fun y -> y)
    |> Seq.map (fun x ->
        match x with 
        | (n, _) -> printfn "%A" n
        | _  ->()
    )
    |> Seq.iter (printfn "%A")
    authenticationResult.ReturnValue.[0]



