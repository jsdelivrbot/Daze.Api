#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open System

// Directories
let buildDir  = "./build/"
let deployDir = "./deploy/"


// Filesets
let appReferences  =
    !! "/**/*.csproj"
    ++ "/**/*.fsproj"

// version info
let version = "0.1"  // or retrieve from CI server

// Targets
Target "Clean" (fun _ ->
    CleanDirs [buildDir; deployDir]
)

Target "Build" (fun _ ->
    // compile all projects below src/app/
    MSBuildDebug buildDir "Build" appReferences
    |> Log "AppBuild-Output: "
)

Target "Deploy" (fun _ ->
    !! (buildDir + "/**/*.*")
    -- "*.zip"
    |> Zip buildDir (deployDir + "ApplicationName." + version + ".zip")
)

Target "deployazure" (fun _ ->
  let sourceDirectory = __SOURCE_DIRECTORY__
  let wwwrootDirectory = __SOURCE_DIRECTORY__ @@ "../wwwroot"
  CleanDir sourceDirectory
  CopyRecursive sourceDirectory wwwrootDirectory false |> ignore
)

// Build order
"Clean"
  ==> "Build"
  ==> "Deploy"

// start build
RunTargetOrDefault "Build"
