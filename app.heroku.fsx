#r "System.Xml.Linq.dll"
#r "packages/Suave/lib/net40/Suave.dll"
#load "./src/api/api.fs"

open Api
open System
open Suave

let serverConfig =
    let port = int (Environment.GetEnvironmentVariable("PORT"))
    { Web.defaultConfig with
          homeFolder = Some __SOURCE_DIRECTORY__
          bindings = [ HttpBinding.createSimple HTTP "0.0.0.0" port ] }

Web.startWebServer serverConfig app