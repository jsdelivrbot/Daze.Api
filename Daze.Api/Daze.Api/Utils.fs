module Daze.Api.Utils

open System
open System.Text
open System.Reflection
open Suave
open Suave.CORS
open Suave.Json
open Newtonsoft.Json


type Int64ToStringConverter() =
    inherit JsonConverter()
    
    override this.CanConvert(t) =
        Type.GetTypeCode(t) = TypeCode.Int64

    override this.WriteJson (writer, value, serializer) =
        let v =
            if this.CanConvert(value.GetType()) then 
                box (string value)
            else value
        serializer.Serialize(writer, v)

    override this.ReadJson(reader, objectType, existingValue, serializer) = 
        serializer.Deserialize(reader, objectType)


let utf8GetBytes (str: string) = 
    Encoding.UTF8.GetBytes(str)

let deserialize<'a> bytes =
     JsonConvert.DeserializeObject<'a>(Encoding.UTF8.GetString(bytes))

let serialize<'a> x = 
    JsonConvert.SerializeObject(x, new Int64ToStringConverter()) |> utf8GetBytes

let mapJsonNet<'a, 'b> = 
    mapJsonWith deserialize<'a> serialize<'b>

let OKJson (responseBytes: byte array) (ctx: HttpContext) =
    async {
        let headers = [("content-type", "application/json;charset=UTF-8")]
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

