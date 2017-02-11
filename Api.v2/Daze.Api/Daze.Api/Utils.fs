module Daze.Api.Utils

open Suave
open Suave.CORS

let defaultCorsConfig = {
    allowedUris = InclusiveOption.All
    allowedMethods = InclusiveOption.All
    maxAge = Some(1)
    allowCookies = false
    exposeHeaders = true }

let OKJson (responseBytes: byte array) (ctx: HttpContext)  =
    async {
        let response = {
            ctx.response with
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
                content = Bytes responseBytes
        }
        return (Some { ctx with response = response })
    }


let OKJsonParameter (responseBytes: byte array) (t: string) (ctx: HttpContext) =
    async {
        let response = {
            ctx.response with 
                headers = [("content-type", "application/json")]
                content = Bytes (System.Text.Encoding.UTF8.GetBytes(t))
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response}
    }
