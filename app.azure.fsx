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
  let port =
    match Environment.GetCommandLineArgs() |> Seq.tryPick (fun s ->
      if s.StartsWith("port=") then Some(int(s.Substring("port=".Length)))
      else None ) with
    | Some p -> p
    | _ -> 8080 // failwith "No port specified"

  { Web.defaultConfig with
      homeFolder = Some __SOURCE_DIRECTORY__
      bindings = [ HttpBinding.createSimple HTTP "127.0.0.1" port ] }

Target "run" (fun _ ->
    startWebServer serverConfig app
)

RunTargetOrDefault "run"
printfn "exiting server..."
