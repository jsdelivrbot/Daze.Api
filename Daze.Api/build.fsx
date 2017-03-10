#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open Fake.Testing
open Fake.AssemblyInfoFile
open System
open System.Text
open System.Reflection
open System.IO


(* Directories *) 
let buildDir  = "./build/"
let deployDir = "./deploy/"
let testDir  = "./build/"


(* Filesets *)
let appReferences =
    !! "/**/*.csproj"
    ++ "/**/*.fsproj"

(* version info *)

// let (success, buildVersion) =
//     (GetAssemblyVersionString
//             (Path.Combine (__SOURCE_DIRECTORY__, "./build/Daze.Api.exe")) )
//             .Split('.')
//     |> Array.last
//     |> Int32.TryParse 

let version = "0.4.0.%i"
//    match success with
//    | true -> sprintf "0.4.0.%i" (buildVersion + 1)
//    | false -> sprintf "0.4.0.%i" (0 + 1)


(* Targets *)
Target "Clean" (fun _ ->
    CleanDirs [buildDir; deployDir]
)

Target "Build" (fun _ ->
    CreateFSharpAssemblyInfo "./Daze.Api/Properties/AssemblyInfo.fs"
        [ Attribute.Title "Daze"
          Attribute.Description "The dazed programmer blog."
          Attribute.Guid "A539B42C-CB9F-4a23-8E57-AF4E7CEE5BAA"
          Attribute.Product "Daze"
          Attribute.Version version
          Attribute.FileVersion version ]

    MSBuildDebug buildDir "Build" appReferences
    |> Log "AppBuild-Output: "
)

Target "Deploy" (fun _ ->
    !! (buildDir + "/**/*.*")
    -- "*.zip"
    |> Zip buildDir (deployDir + "ApplicationName." + version + ".zip")
)

(* Build order *)
"Clean"
  ==> "Build"
  ==> "Deploy"

(* start build *)
RunTargetOrDefault "Build"
