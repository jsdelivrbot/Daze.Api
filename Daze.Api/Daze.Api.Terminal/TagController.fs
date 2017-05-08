[<RequireQualifiedAccess>]
module Daze.Api.TagController

open Daze.Api.Utils

let get = 
    let tags = TagService.getAllTags()
    OKJson (serialize tags)




