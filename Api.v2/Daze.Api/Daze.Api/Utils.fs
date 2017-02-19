module Daze.Api.Utils

open System
open System.Text
open Suave
open Suave.CORS
open Suave.Json
open Newtonsoft.Json

let defaultCorsConfig = {
    allowedUris = InclusiveOption.All
    allowedMethods = InclusiveOption.All
    maxAge = Some(1)
    allowCookies = false
    exposeHeaders = true }

let utf8GetBytes (str: string) = 
    Encoding.ASCII.GetBytes(str)

let deserialize<'a> bytes =
     JsonConvert.DeserializeObject<'a>(System.Text.Encoding.ASCII.GetString(bytes))

let serialize<'a> x = 
    JsonConvert.SerializeObject(x) |> utf8GetBytes

let mapJsonNet<'a, 'b> = 
    mapJsonWith deserialize<'a> serialize<'b>

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

let (|Content|NoContent|) (items: seq<'a>) =
    if (Seq.isEmpty <| items) then NoContent 
    else Content

let (|Content'|NoContent'|) (item: 'a) =
    if (isNull item) then NoContent'
    else Content'


type Suave.Http.HttpContext with
    member this.GetRequestBody () = 
        let requestBody = this.request.rawForm
        deserialize requestBody

    member this.GetResponseWith (entity: 'a) =
        let successResponse = {
            this.response with 
                content = Bytes (serialize entity)
                headers = [("content-type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        let failResponse = {
            this.response with 
                status = { code = 404; reason = "NOT FOUND" }
        }
        match entity with 
        | null -> failResponse
        | _ -> successResponse
        
