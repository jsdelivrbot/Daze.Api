namespace Db


[<RequireQualifiedAccess>]
module Auth =

    open System
    open Domain
    open BaseDb

    type LoginResult = {
        new_id: string
        success: string
        message: string
        password: string }

    let authenticate (username: string, password: string) =
        let authenticationResult =
            FunctionsContext
                .Authenticate
                .Invoke(username, password, "local_login")

        authenticationResult.ReturnValue.[0].GetColumn("success"): bool

    let login (loginModel: LoginModel) =
        let authenticationResult =
            FunctionsContext
                .Authenticate
                .Invoke(loginModel.username, loginModel.password, "local")
                .ReturnValue.[0]

        let loginResult = {
            new_id= authenticationResult.GetColumn("new_id")
            success= authenticationResult.GetColumn("success")
            message= authenticationResult.GetColumn("message")
            password = authenticationResult.GetColumn("password")
        }
        printfn "pwd:=>  %A" loginResult
        loginResult


