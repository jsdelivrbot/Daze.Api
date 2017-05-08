[<RequireQualifiedAccess>]
module Daze.Api.TagService

open System
open Daze.Api.BaseService
open Daze.Api.Domain

let getAllTags () = 
    query {
        for tag in ctx.Public.Tag do
        select { Id = tag.Id
                 TagName = tag.TagName }
        
    } |> Seq.cache


let getSingle = 



