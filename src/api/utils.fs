module Utils

open System
open System.Text
open System.Reflection
open Suave
open Suave.CORS
open Suave.Json
open Suave.State.CookieStateStore
open System.Security.Cryptography
open Newtonsoft.Json
open Serializers
open Types


type SupportedHttpMethods =
| Post of verbs : string
| Tag of verbs : string
| Skill of verbs : string
| Project of verbs : string


let utf8GetBytes (str: string) =
    Encoding.UTF8.GetBytes(str)

let deserialize<'a> bytes =
     JsonConvert.DeserializeObject<'a>(
        Encoding.UTF8.GetString(bytes),
        new Int64ToStringConverter(),
        new OptionConverter()
     )

let serialize<'a> x =
    JsonConvert.SerializeObject(x,
        new Int64ToStringConverter(),
        new OptionConverter()
    )
    |> utf8GetBytes

let mapJsonNet<'a, 'b> =
    mapJsonWith deserialize<'a> serialize<'b>

let OKJson (responseBytes: byte array) (ctx: HttpContext) =
    async {
        let headers = [("Content-Type", "application/json;charset=UTF-8")]
        let response = {
            ctx.response with
                content = Bytes responseBytes
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


let hashPassword (password: string) =
    use sha = SHA256.Create()
    utf8GetBytes(password)
    |> sha.ComputeHash
    |> Array.map (fun b -> b.ToString("x2"))
    |> String.concat ""

let sessionStore setFun =
    context (fun x ->
        match HttpContext.state x with
        | Some state -> setFun state
        | None -> never)

let sessionGet getFun =
    context (fun x ->
        match HttpContext.state x with
        | Some state -> getFun state
        | None -> never )


type Suave.Http.HttpContext with
    member this.GetRequestBody () =
        let requestBody = this.request.rawForm
        deserialize requestBody

    member this.GetResponseWith (entity: 'a) =
        let successResponse = {
            this.response with
                content = Bytes (serialize entity)
                headers = [("Content-Type", "application/json")]
                status = { code = 200; reason = "OK" }
        }
        let failResponse = {
            this.response with
                status = { code = 404; reason = "NOT FOUND" }
        }
        match entity with
        | null -> failResponse
        | _ -> successResponse

    member this.GetOptionsResponseFor (case: SupportedHttpMethods) =
        match case with
        | Post(p) | Project(p) | Skill(p) | Tag(p) ->
            let response = {
                this.response with
                    headers = [("Allow", p)]
                    status = { code = 200; reason = "OK" }
            }
            response


