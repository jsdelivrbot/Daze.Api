[<RequireQualifiedAccess>]
module Daze.Api.SkillService

open Daze.Api.BaseService
open Daze.Api.Domain

let getAllSkills () = 
    let skills = query { 
        for s in ctx.Public.Skill do
        select { Id = s.Id
                 SkillName = s.Name
                 FocusArea = s.FocusArea
                 Level = s.Level }
    }
    if Seq.isEmpty skills then None
    else Some (Seq.cache skills)

let findSkillById (id: int64) =
    let skill = query {
        for s in ctx.Public.Skill do
        where (s.Id = id)
        exactlyOneOrDefault
    }
    if isNull skill then None
    else Some { Id = skill.Id
                SkillName = skill.Name
                FocusArea = skill.FocusArea
                Level = skill.Level }

let existsSkill (id: int64) = 
    query {
        for s in ctx.Public.Skill do
        exists (s.Id = id)
    }

let asyncInsertNewSkill (skill: Skill) =
    async {
        let newSkill = ctx.Public.Skill.Create() 
        newSkill.Name <- skill.SkillName
        newSkill.Level <- skill.Level
        newSkill.FocusArea <- skill.FocusArea

        try 
            do! ctx.SubmitUpdatesAsync()
        with _ ->
            ctx.GetUpdates()
            ctx.ClearUpdates()
    }

let asyncFullyUpdateSkill (skill: Skill) = 
    async {
        let foundSkill = query {
            for s in ctx.Public.Skill do
            where (s.Id = int64 skill.Id)
            exactlyOneOrDefault
        }
        if not (isNull foundSkill) then 
            foundSkill.Name <- skill.SkillName
            foundSkill.Level <- skill.Level
            foundSkill.FocusArea <- skill.FocusArea
        
        do! ctx.SubmitUpdatesAsync()
    }

let asyncPartiallyUpdateSkill (skill: Skill) =
    async {
        let foundSkill = query {
            for s in ctx.Public.Skill do
            where (s.Id = skill.Id)
            exactlyOneOrDefault
        }
        if not (isNull foundSkill) then
            if skill.SkillName.IsSome then 
                foundSkill.Name <- skill.SkillName

            if skill.Level.IsSome then
                foundSkill.Level <- skill.Level
                
            if skill.FocusArea.IsSome then
                foundSkill.FocusArea <- skill.FocusArea
        
        do! ctx.SubmitUpdatesAsync()
    }

let removeSkill (id: int64) =
    async {
        let skill = ctx.Public.Skill.Create()
        skill.Id <- id
        skill.Delete()
        do! ctx.SubmitUpdatesAsync()
    } |> Async.RunSynchronously


