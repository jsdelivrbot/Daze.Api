[<RequireQualifiedAccess>]
module Daze.Api.ProjectService

open Daze.Api.Services
open Daze.Api.Domain

let getAllProjects() = 
    query { 
        for p in ctx.Public.Project do
            take 100
            select { Id = p.Id
                     Name = p.Name
                     Description = p.Description
                     Url = p.Url }
    }
    |> Seq.cache
