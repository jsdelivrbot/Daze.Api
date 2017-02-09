[<RequireQualifiedAccess>]
module Daze.Api.Services

open System
open FSharp.Data
open FSharp.Data.Sql
open Npgsql
open Suave

let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
let [<Literal>] ConnectionString = "Host=localhost;Port=5432;Database=dvdrental;Username=daze;Password=daze"
let [<Literal>] IndividualsAmount = 1000
let [<Literal>] UseOptionTypes = false
// let [<Literal>] ResolutionPath = @"C:\Users\daze\Desktop\Daze.Api\packages\Npgsql\lib\net451\Npgsql.dll"
let [<Literal>] ResolutionPath = @"C:\Users\daze\Documents\Visual Studio 2015\Projects\Daze\Api.v2\Daze.Api\packages\Npgsql\lib\net451\Npgsql.dll"

let [<Literal>] Owner = "daze"

type PgProvider =
    SqlDataProvider<
        DbVendor,
        ConnectionString,
        "", (* ConnectionNameString can be left empty *)
        ResolutionPath,
        IndividualsAmount,
        UseOptionTypes>

let ctx = PgProvider.GetDataContext()


type Post = {
    Id: Guid
    Data: string }

let getPosts () =
    []
    // let posts = query { for p in ctx.Domain.MtDocPost do
    //                     take 100 
    //                     select { Id = p.Id ; Data = p.Data } }
    //                     |> Seq.toArray
    //                     |> Seq.map (fun x -> x.Data )
    //                     |> Seq.reduce (fun acc curr -> acc + curr + Environment.NewLine)
    //                     |> Json.toJson 
    // posts