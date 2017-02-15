[<RequireQualifiedAccess>]
module Daze.Api.SkillService

open Daze.Api.Services
open Daze.Api.Domain

let getAllSkills () = 
    query { 
        for s in ctx.Public.Skill do
        select { Id = s.Id
                 Name = s.Name
                 FocusArea = s.FocusArea
                 Level = s.Level }
    }
    |> Seq.cache

let findSkillById (id: int64) =
    query {
        for s in ctx.Public.Skill do
        where (s.Id = id)
        select { Id = s.Id
                 Name = s.Name
                 FocusArea = s.FocusArea
                 Level = s.Level }
        exactlyOne
    }

let existsSkill (id: int64) = 
    query {
        for s in ctx.Public.Skill do
        exists (s.Id = id)
    }