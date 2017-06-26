module BaseService

open System
open System.IO
open FSharp.Data.Sql
open Npgsql

let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
// let [<Literal>] ConnectionStringLocal = "host=localhost;database=daze_db;password=daze;username=daze;"
let [<Literal>] ConnectionStringHeroku = "SSL Mode=Prefer;Trust Server Certificate=true;host=ec2-79-125-13-42.eu-west-1.compute.amazonaws.com;database=d581ac58mau63r;password=314ce477224861d0f7946cd6e4f3af114cd1d45c874eab6e34602e2aafa47fd9;username=yyvtjjkjittkdg;port=5432;"
//let [<Literal>] ConnectionStringGCloud = "host=35.187.43.156;database=daze_db;password=swords$online$99;username=daze;pooling=True;"
let [<Literal>] ConnectionNameString = "" // ConnectionNameString can be left empty
let [<Literal>] IndividualsAmount = 1000
let [<Literal>] UseOptionTypes = true
let [<Literal>] ResolutionPath = @"..\packages\Npgsql\lib\netstandard1.3\Npgsql.dll"

type PgProvider = SqlDataProvider<
                    DbVendor,
                    ConnectionStringHeroku,
                    ConnectionNameString,
                    ResolutionPath,
                    IndividualsAmount,
                    UseOptionTypes>

let ctx = PgProvider.GetDataContext()

