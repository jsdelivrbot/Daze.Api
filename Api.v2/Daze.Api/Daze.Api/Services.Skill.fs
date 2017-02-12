[<RequireQualifiedAccess>]
module Daze.Api.SkillService

open Daze.Api.Services
open Daze.Api.Domain

let getAllSkills() = 
    query { 
        for s in ctx.Public.Skill do
            take 100
            select { Id = s.Id
                     FocusArea = s.FocusArea
                     Level = s.Level }
    }
    |> Seq.cache
