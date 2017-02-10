[<RequireQualifiedAccess>]
module Daze.Api.Services

open System
open FSharp.Data
open FSharp.Data.Sql
open Npgsql
open Suave
open Daze.Api.Domain

let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
let [<Literal>] ConnectionString = "host=localhost;database=daze_db;password=daze;username=daze;"
let [<Literal>] IndividualsAmount = 1000
let [<Literal>] UseOptionTypes = false
let [<Literal>] ResolutionPath = @"C:\Users\daze\Documents\Visual Studio 2015\Projects\Daze\Api.v2\Daze.Api\packages\Npgsql\lib\net451\Npgsql.dll"


type PgProvider = SqlDataProvider<
                    DbVendor,
                    ConnectionString,
                    "", (* ConnectionNameString can be left empty *)
                    ResolutionPath,
                    IndividualsAmount,
                    UseOptionTypes>

let ctx = PgProvider.GetDataContext()

let getPosts () =
    query { 
        for p in ctx.Public.Post do
            take 100 
            select {
                Id = p.Id
                Slug = p.Slug
                Title = p.Title
                Content = p.Content 
                CreatedAt = p.CreatedAt
                ModifiedAt = p.ModifiedAt
            } 
    }
    |> Seq.toArray
    |> Json.toJson

let getSkills () =
    query { 
        for s in ctx.Public.Skill do
            take 100
            select {
                Id = s.Id
                FocusArea = s.FocusArea
                Level = s.Level
            }
    }
    |> Seq.toArray
    |> Json.toJson

let projects () =
    query {
        for p in ctx.Public.Project do
            take 100 
            select {
                Id = p.Id
                Name = p.Name
                Description = p.Description
                Url = p.Url
            }
    }
    |> Seq.toArray
    |> Json.toJson