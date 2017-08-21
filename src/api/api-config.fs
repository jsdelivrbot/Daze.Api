namespace Api

module Config =

    open System
    open Suave
    open Suave.CORS

    type HTTP = HttpMethod

    let defaultCorsConfig = {
        allowedUris = InclusiveOption.Some [
                            "http://localhost:3000"
                            "http://localhost:5000"
                            "https://daze-spa.herokuapp.com"
                            "https://afractal.herokuapp.com"
                            "http://afractal.herokuapp.com" ]
        allowedMethods = InclusiveOption.Some [
                            HTTP.GET
                            HTTP.HEAD
                            HTTP.POST
                            HTTP.PUT
                            HTTP.PATCH
                            HTTP.DELETE
                            HTTP.OPTIONS ]
        allowCookies = true
        maxAge = Some(Int32.MaxValue)
        exposeHeaders = InclusiveOption.All }


    let serverConfig =
        let mode = Environment.GetEnvironmentVariable("ENV")
        let port = if mode = "prod" then int (Environment.GetEnvironmentVariable("PORT")) else 8080
        let ip = if mode = "prod" then "0.0.0.0" else "127.0.0.1"

        { defaultConfig with
              homeFolder = Some __SOURCE_DIRECTORY__
              bindings = [ HttpBinding.createSimple HTTP ip port ] }
