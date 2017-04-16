module Daze.Api.BaseService

open System
open System.IO
open FSharp.Data.Sql
open Npgsql

let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
//let [<Literal>] ConnectionString = "host=localhost;database=daze_db;password=daze;username=daze;"
//let [<Literal>] ConnectionString = "host=ec2-79-125-118-221.eu-west-1.compute.amazonaws.com;database=d61j8q5jugg0gt;password=5148065972a3e30a340554d9e43303ab7ea3c35bde0a514114cf947d03b6fdd0;username=ukloqkouwwawpb;"
let [<Literal>] ConnectionString = "host=35.187.43.156;database=daze_db;password=swords$online$99;username=daze;"
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
