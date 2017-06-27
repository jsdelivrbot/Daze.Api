#r "./packages/FAKE/tools/FakeLib.dll"
#r "./packages/Suave/lib/net40/Suave.dll"
#load "./src/api/api.fs"

open Api
open Fake
open System
open System.Net
open Suave
open Suave.Http


let serverConfig =
    let port = int (getBuildParam "port")
    { defaultConfig with
         homeFolder = Some __SOURCE_DIRECTORY__
         bindings = [ HttpBinding.createSimple HTTP "127.0.0.1" port ] }

Target "run" (fun _ ->
    startWebServer serverConfig app
)

RunTargetOrDefault "run"