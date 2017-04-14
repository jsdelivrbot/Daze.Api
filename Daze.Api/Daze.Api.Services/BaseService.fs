module Daze.Api.BaseService

open System
open System.IO
open FSharp.Data.Sql
open Npgsql

let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
let [<Literal>] ConnectionString = "host=localhost;database=daze_db;password=daze;username=daze;"
let [<Literal>] ConnectionNameString = ""
let [<Literal>] IndividualsAmount = 1000
let [<Literal>] UseOptionTypes = true
let [<Literal>] ResolutionPath = @"..\packages\Npgsql.3.1.10\lib\netstandard1.3\Npgsql.dll"
// let [<Literal>] ResolutionPath = (Path.Combine(__SOURCE_DIRECTORY__, @"..\packages\Npgsql\lib\net451\Npgsql.dll"))

type PgProvider = SqlDataProvider<
                    DbVendor,
                    ConnectionString,
                    ConnectionNameString, (* ConnectionNameString can be left empty *)
                    ResolutionPath,
                    IndividualsAmount,
                    UseOptionTypes>

let ctx = PgProvider.GetDataContext()
