// include Fake libs
#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open Fake.Testing

// Directories
let buildDir  = "./build/"
let deployDir = "./deploy/"
let testDir  = "./build/"

// Filesets
let appReferences  =
    !! "/**/*.csproj"
    ++ "/**/*.fsproj"

// version info
let version = "0.1"  // or retrieve from CI server

// Targets

let generateDocs() = 
    tracefn "Generating docs."
    
Target "GenerateDocs" (fun _ ->
    generateDocs()
)

Target "Clean" (fun _ ->
    CleanDirs [buildDir; deployDir]
)

Target "Build" (fun _ ->
    // compile all projects below src/app/
    MSBuildDebug buildDir "Build" appReferences
    |> Log "AppBuild-Output: "
)

// let runTests () =
//     tracefn "Running tests..."
//     !! (testDir @@ "Daze.Api.Tests.dll")
//     |> xUnit2 (fun p -> {
//                         p with HtmlOutputPath = Some(testDir @@ "xunit.html");
//                                ToolPath = @"./packages/xunit.runner.console/tools/xunit.console.exe";
//                         })

// let fullDir = System.IO.Path.GetFullPath testDir
// Target "Watch" (fun _ ->
//     use watcher = !! (fullDir @@ "*.*") |> WatchChanges (fun changes ->
//         runTests()
//     )
//     System.Console.ReadLine() |> ignore
//     watcher.Dispose()
// )                       

// Target "Test" (fun _ ->
//     runTests()
// )

Target "Deploy" (fun _ ->
    !! (buildDir + "/**/*.*")
    -- "*.zip"
    |> Zip buildDir (deployDir + "ApplicationName." + version + ".zip")
)

// Build order
"Clean"
  ==> "Build"
  ==> "Deploy"

// start build
RunTargetOrDefault "Build"