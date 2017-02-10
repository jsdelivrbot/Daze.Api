module Daze.Api.Utils

open Suave
open Suave.CORS
let defaultCorsConfig = {
    allowedUris = InclusiveOption.All
    allowedMethods = InclusiveOption.All
    maxAge = Some(1)
    allowCookies = false
    exposeHeaders = true }
let OKJson (bytes : byte array) (ctx: HttpContext)  =
    async {
        let responseBytes = bytes
        let headers = [("content-type","application/json")]
        let response = {
            ctx.response with 
                content = Bytes responseBytes; 
                headers = headers;
                status = { code = 200; reason = "NOTFOUND" }
        }
        return (Some { ctx with response = response })
    }