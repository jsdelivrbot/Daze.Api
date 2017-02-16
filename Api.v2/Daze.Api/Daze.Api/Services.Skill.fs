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

let asyncInsertNewSkill (skill: Skill) =
    async {
        let newSkill = ctx.Public.Skill.Create() 
        newSkill.Name <- skill.Name
        newSkill.Level <- skill.Level
        newSkill.FocusArea <- skill.FocusArea
        do! ctx.SubmitUpdatesAsync()
    }

let asyncFullyUpdateSkill (skill: Skill) = 
    async {
        query {
            for s in ctx.Public.Skill do
            where (s.Id = skill.Id)
        }
        |> Seq.iter(fun s ->
            s.Name <- skill.Name
            s.Level <- skill.Level
            s.FocusArea <- skill.FocusArea
        )
        do! ctx.SubmitUpdatesAsync()
    }

let asyncPartiallyUpdateSkill (skill: Skill) =
    async {
        query {
            for s in ctx.Public.Skill do
            where (s.Id = skill.Id)
        }
        |> Seq.iter(fun s ->
            if not (isNull skill.Name) then  s.Name <- skill.Name
            if skill.Level <> 0  then  s.Level <- skill.Level
            if not (isNull skill.FocusArea) then s.FocusArea <- skill.FocusArea
        )
        do! ctx.SubmitUpdatesAsync()
    }

let remove (id: int64) =
    async {
        let skill = ctx.Public.Skill.Create()
        skill.Id  <- id
        skill.Delete()
        do! ctx.SubmitUpdatesAsync()
    } |> Async.RunSynchronously


