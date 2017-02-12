module Daze.Api.Utils

open Suave
open Suave.CORS
open System
open System.Text

let defaultCorsConfig = {
    allowedUris = InclusiveOption.All
    allowedMethods = InclusiveOption.All
    maxAge = Some(1)
    allowCookies = false
    exposeHeaders = true }

let OKJson (responseBytes: byte array) (ctx: HttpContext) =
    async {
        let headers = [("content-type", "application/json")]
        let response = {
            ctx.response with
                content = HttpContent.Bytes responseBytes
                headers = headers 
                status = { code = 200; reason = "OK" }
        }
        return Some { ctx with response = response }
    }