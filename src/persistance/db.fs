namespace Persistance.Db

module BaseDb =

    open System
    open System.Configuration
    open System.IO
    open FSharp.Data.Sql
    open FSharp.Configuration
    open Npgsql
    open Domain


    let [<Literal>] DbVendor = Common.DatabaseProviderTypes.POSTGRESQL
    let [<Literal>] CompileTimeConnectionNameString = "Local"
    let [<Literal>] IndividualsAmount = 1000
    let [<Literal>] UseOptionTypes = true
    let [<Literal>] ResolutionPath = @"..\packages\Npgsql\lib\netstandard1.3\Npgsql.dll"


    type Settings = AppSettings<"App.config">

    type PgProvider =
        SqlDataProvider<
            DatabaseVendor = DbVendor,
            ConnectionString = ConnectionStringHeroku,
            // ConnectionStringName = CompileTimeConnectionNameString,
            ResolutionPath = ResolutionPath,
            IndividualsAmount = IndividualsAmount,
            UseOptionTypes = UseOptionTypes>

    let runtimeConnectionString = System.Environment.GetEnvironmentVariable("DAZE_PROD")
    let ctx = PgProvider.GetDataContext runtimeConnectionString

    let PostContext = ctx.Public.Post
    let TagContext = ctx.Public.Tag
    let ProjectContext = ctx.Public.Project
    let PostTagContext = ctx.Public.PostTag
    let SkillContext = ctx.Public.Skill
    let FunctionsContext = ctx.Functions


    type PostEntity = PgProvider.dataContext.``public.postEntity``
    type TagEntity = PgProvider.dataContext.``public.tagEntity``
    type ProjectEntity = PgProvider.dataContext.``public.projectEntity``
    type SkillEntity = PgProvider.dataContext.``public.skillEntity``
    type PostTagEntity = PgProvider.dataContext.``public.post_tagEntity``
    type FunctionsEntity = PgProvider.dataContext.Functions



