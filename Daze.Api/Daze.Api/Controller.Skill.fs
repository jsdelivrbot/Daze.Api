[<RequireQualifiedAccess>]
module Daze.Api.SkillController

open Suave
open Suave.Successful
open Suave.Writers
open Daze.Api.Utils
open Daze.Api.Domain


let get = 
    let skills = SkillService.getAllSkills()
    match skills with 
    | Some ss -> OKJson (serialize ss)
    | None -> no_content

let getSingle (id: int64) =
    let skill = SkillService.findSkillById id
    match skill with 
    | Some s -> OKJson (serialize s)
    | None -> no_content

let head (id: int64) = 
    let exists = SkillService.existsSkill id
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) =
    async {
        let skill = ctx.GetRequestBody<Skill>()
        do! SkillService.asyncInsertNewSkill skill
        return Some { ctx with response = ctx.GetResponseWith skill }
    }
let asyncPut (ctx: HttpContext) = 
    async {
        let skill = ctx.GetRequestBody<Skill>()
        do! SkillService.asyncFullyUpdateSkill skill
        return Some { ctx with response = ctx.GetResponseWith skill }
    }
    
let asyncPatch (ctx: HttpContext) =
    async {
        let skill = ctx.GetRequestBody<Skill>()
        do! SkillService.asyncPartiallyUpdateSkill skill
        return Some { ctx with response = ctx.GetResponseWith skill }
    }
    
let delete (id: int64) = 
    if SkillService.existsSkill id then 
        SkillService.removeSkill id
        setStatus HTTP_200
    else 
        setStatus HTTP_204