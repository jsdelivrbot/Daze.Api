[<RequireQualifiedAccess>]
module VersionController

open System.Reflection
open Suave.Successful
open Utils

let getVersionTuple () =
    let currentAssembly = Assembly.GetExecutingAssembly().GetName()
    let version = currentAssembly.Version.ToString()
    let name = currentAssembly.Name
    (name, version)

let getVersion =
    let (name, version) = getVersionTuple ()
    OKJson (serialize version)

