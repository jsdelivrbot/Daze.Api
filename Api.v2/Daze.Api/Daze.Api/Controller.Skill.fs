[<RequireQualifiedAccess>]
module Daze.Api.SkillController

open Suave
open Daze.Api.JsonHelper
open Daze.Api.Utils
open Suave.Writers


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
