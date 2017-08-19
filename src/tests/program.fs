open Expecto


[<EntryPoint>]
let main args =
    let argv = [| "--sequenced"; "--debug"; "--my-spirit-is-weak" |]
    runTestsInAssembly Tests.defaultConfig argv

