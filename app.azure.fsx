// --------------------------------------------------------------------------------------
// Start the 'app' WebPart defined in 'app.fsx' on Azure using %HTTP_PLATFORM_PORT%
// --------------------------------------------------------------------------------------

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
    let port = getBuildParamOrDefault "port" "8083" |> Sockets.Port.Parse
    { defaultConfig with
         // homeFolder = Some __SOURCE_DIRECTORY__
         bindings = [ HttpBinding.create HTTP IPAddress.Loopback port ] }

startWebServer serverConfig app