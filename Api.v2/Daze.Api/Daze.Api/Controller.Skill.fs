[<RequireQualifiedAccess>]
module Daze.Api.SkillController

open Suave
open Daze.Api.JsonHelper
open Daze.Api.Utils
open Suave.Writers
open Daze.Api.Domain
open Daze.Api.Services


let get = 
    let skills = SkillService.getAllSkills()
    OKJson (serialize skills)

let getSingle (id: int64) =
    let skill = SkillService.findSkillById id
    OKJson (serialize skill)
    
let head (id: int64) = 
    let exists = SkillService.existsSkill id
    if exists then setStatus HTTP_200
    else setStatus HTTP_404

let asyncPost (ctx: HttpContext) =
    async {
        let requestBody = ctx.request.rawForm
        let skill = deserialize requestBody

        do! SkillService.asyncInsertNewSkill skill
        let response = {
            ctx.response with 
                content = Bytes (serialize skill)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }
let asyncPut (ctx: HttpContext) = 
    async {
        let requestBody = ctx.request.rawForm
        let skill = deserialize requestBody

        do! SkillService.asyncFullyUpdateSkill skill
        let response = {
            ctx.response with 
                content = Bytes (serialize skill)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }
    
let asyncPatch (ctx: HttpContext) =
    async {
        let requestBody = ctx.request.rawForm
        let skill = deserialize requestBody

        do! SkillService.asyncPartiallyUpdateSkill skill
        let response = {
            ctx.response with 
                content = Bytes (serialize skill)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }

let delete (id: int64) = 
    SkillService.removeSkill id
    setStatus HTTP_200