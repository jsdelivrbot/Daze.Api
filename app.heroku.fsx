#if BOOTSTRAP
System.Environment.CurrentDirectory <- __SOURCE_DIRECTORY__
if not (System.IO.File.Exists "paket.exe") then
    let url = "https://github.com/fsprojects/Paket/releases/download/3.13.3/paket.exe" in
        use wc = new System.Net.WebClient() in
        let tmp = System.IO.Path.GetTempFileName() in
            wc.DownloadFile(url, tmp);
    System.IO.File.Move(tmp,System.IO.Path.GetFileName url);;
#r "paket.exe"
Paket.Dependencies.Install (System.IO.File.ReadAllText "paket.dependencies")
#endif

#I "packages/Suave/lib/net40"
#r "packages/Suave/lib/net40/Suave.dll"
#load "./src/api/api.fs"

open Api
open System
open System.Net
open Suave
open Suave.Http
open System
open System.IO
open Suave.Web

let serverConfig =
    let port = System.Environment.GetEnvironmentVariable("PORT")
    let ip127  = IPAddress.Parse("127.0.0.1")
    let ipZero = IPAddress.Parse("0.0.0.0")
    { defaultConfig with
        bindings=[ (if port = null then HttpBinding.create HTTP ip127 (uint16 8080)
                    else HttpBinding.create HTTP ipZero (uint16 port)) ] }

startWebServer serverConfig app
printfn "exiting server..."