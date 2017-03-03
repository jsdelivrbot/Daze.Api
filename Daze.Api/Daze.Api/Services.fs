module Daze.Api.Services

open System
open FSharp.Data.Sql.Common
open FSharp.Data
open FSharp.Data.Sql
open Npgsql
open Suave

let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
let [<Literal>] ConnectionString = "host=localhost;database=daze_db;password=daze;username=daze;"

let [<Literal>] ConnectionNameString = ""
let [<Literal>] IndividualsAmount = 1000
let [<Literal>] UseOptionTypes = true
let [<Literal>] ResolutionPath = @"C:\Users\daze\Documents\Visual Studio 2015\Projects\Daze\Api.v2\Daze.Api\packages\Npgsql\lib\net451\Npgsql.dll"

type PgProvider = SqlDataProvider<
                    DbVendor,
                    ConnectionString,
                    ConnectionNameString, (* ConnectionNameString can be left empty *)
                    ResolutionPath,
                    IndividualsAmount,
                    UseOptionTypes>

let ctx = PgProvider.GetDataContext()
