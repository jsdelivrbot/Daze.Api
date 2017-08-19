[<RequireQualifiedAccess>]
module SkillController

open Suave
open Suave.Successful
open Suave.Writers
open Utils
open Domain


let get =
    let skills = Db.Skill.getAllSkills()
    match skills with
    | Some ss -> OKJson (serialize ss)
    | None -> no_content

let getSingle (id: int64) =
    let skill = Db.Skill.findSkillById id
    match skill with
    | Some s -> OKJson (serialize s)
    | None -> no_content

let head (id: int64) =
    let exists = Db.Skill.existsSkill id
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) =
    async {
        let skill = ctx.GetRequestBody<Skill>()
        do! Db.Skill.asyncInsertNewSkill skill
        return Some { ctx with response = ctx.GetResponseWith skill }
    }
let asyncPut (ctx: HttpContext) =
    async {
        let skill = ctx.GetRequestBody<Skill>()
        do! Db.Skill.asyncFullyUpdateSkill skill
        return Some { ctx with response = ctx.GetResponseWith skill }
    }

let asyncPatch (ctx: HttpContext) =
    async {
        let skill = ctx.GetRequestBody<Skill>()
        do! Db.Skill.asyncPartiallyUpdateSkill skill
        return Some { ctx with response = ctx.GetResponseWith skill }
    }

let asyncOptions (ctx: HttpContext) =
    async {
        let response = ctx.GetOptionsResponseFor (SupportedHttpMethods.Skill "GET, HEAD, POST, PUT, PATCH, DELETE")
        return Some { ctx with response = response }
    }

let delete (id: int64) =
    if Db.Skill.existsSkill id then
        Db.Skill.removeSkill id
        setStatus HTTP_200
    else
        setStatus HTTP_204
