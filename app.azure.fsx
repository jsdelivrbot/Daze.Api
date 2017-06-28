#r "packages/Suave/lib/net40/Suave.dll"
#r "packages/FAKE/tools/FakeLib.dll"
#load "./src/api/api.fs"

open Api
open Fake
open System
open System.Net
open Suave
open Suave.Http
open System
open System.IO
open Suave.Web

let serverConfig =
    let port = getBuildParamOrDefault "port" null
    let ip127  = IPAddress.Parse("127.0.0.1")
    let ipZero = IPAddress.Parse("0.0.0.0")
    { defaultConfig with
        bindings=[ (if port = null then HttpBinding.create HTTP ip127 (uint16 8080)
                    else HttpBinding.create HTTP ipZero (uint16 port)) ] }

Target "run" (fun _ ->
    startWebServer serverConfig app
)

RunTargetOrDefault "run"
printfn "exiting server..."
