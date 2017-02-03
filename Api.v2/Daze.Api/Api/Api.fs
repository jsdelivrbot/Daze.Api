module DazeApi.Program

open Suave
open Suave.CORS
open Suave.Successful
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open System
open System.Text
open System.IO
open FSharp.Data.Sql
open Npgsql
open Newtonsoft.Json

let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
let [<Literal>] ConnectionString = "Host=localhost;Port=5432;Pooling=false;Database=daze_api;Username=daze;Password=daze"
let [<Literal>] IndividualsAmount = 1000
let [<Literal>] UseOptionTypes = false
let [<Literal>] ResolutionPath = @"C:\Users\daze\Desktop\Daze.Api\packages\Npgsql\lib\net451\Npgsql.dll"


type PgProvider =
    SqlDataProvider<
        DbVendor,
        ConnectionString,
        "",         // ConnectionNameString can be left empty 
        ResolutionPath,
        IndividualsAmount,
        UseOptionTypes>

let ctx = PgProvider.GetDataContext()

query { for x in ctx.Public.MtDocPost do
        take 100
        select x.Id }
    |> Seq.toArray 
    |> Seq.iter ( printfn "%A" )

type Post = {
    Id: Guid
    Data: string }

let posts = query { for p in ctx.Public.MtDocPost do
                    take 100 
                    select { Id = p.Id ; Data = p.Data } }
                    |> Seq.toArray
                    |> Seq.map (fun x -> x.Data )
                    |> Seq.reduce (fun acc curr -> acc + curr + Environment.NewLine)
                    |> Json.toJson 

// byte to string

module JsonHelper =
    open Newtonsoft.Json
    open Suave.Json
    open System.Text
    
    let utf8GetBytes (str: string) = System.Text.Encoding.ASCII.GetBytes(str)
    let deserialize<'a> bytes = JsonConvert.DeserializeObject<'a>(System.Text.Encoding.ASCII.GetString(bytes))
    let serialize<'a> x = JsonConvert.SerializeObject(x) |> utf8GetBytes
    let mapJsonNet<'a, 'b> = mapJsonWith deserialize<'a> serialize<'b>

let helloWorldPart = (OK "hello world")
let postsWebPart = (JsonHelper.serialize posts) 

let OKJson (ctx: HttpContext) =
    async {
        let responseBytes = posts//System.Text.Encoding.UTF8.GetBytes("hello world")
        let headers = [("content-type","application/json")]
        let response = {
            ctx.response with 
                content = Bytes responseBytes; 
                headers = headers;
                status = { code = 200; reason = "for reason" }
        }
        return (Some { ctx with response = response })
    }

let defaultCorsConfig = {
    allowedUris = InclusiveOption.All
    allowedMethods = InclusiveOption.All
    maxAge = Some(1)
    allowCookies = false
    exposeHeaders = true }

let app =
    choose [
        GET >=> path "/" >=> helloWorldPart
        GET >=> path "/api/posts/" >=> (OKJson) >=> cors defaultCorsConfig
        // GET >=> pathScan "/test/%s/%i" helloWorld3Part
        NOT_FOUND "you are lost"
    ]

[<EntryPoint>]
let main argv =
    startWebServer defaultConfig app
    0
