namespace Api

[<RequireQualifiedAccess>]
module ProjectController =

    open Suave
    open Suave.Successful
    open Suave.Writers
    open Domain
    open Api.Utils
    open Api.Types
    open Persistance

    let get =
        let projects = Db.Project.getAllProjects()

        let links = {
            Self = { href = "/api/project/" }
            Next = { href = "/api/project/2/2" } }

        let hal = {
            totalCount = Seq.length projects
            _links = links
            _embedded = Items (projects) }

        OKJson (serialize hal)

    let getSingle (id: int64) =
        let project = Db.Project.findProjectById id

        let links = {
            Self = { href = sprintf "/api/project/%i" id }
            Next = { href = null } }

        let hal = {
            totalCount = if project.IsNone then 0 else 1
            _links = links
            _embedded = Item(project) }

        OKJson (serialize hal)


    let head (id: int64) =
        let exists = Db.Project.existsProject id
        if exists then setStatus HTTP_200
        else setStatus HTTP_204

    let asyncPost (ctx: HttpContext) =
        async {
            let project = ctx.GetRequestBody<Project>()
            do! Db.Project.insertNewProject project
            return Some { ctx with response = ctx.GetResponseWith project }
        }

    let asyncPut (ctx: HttpContext) =
        async {
            let project = ctx.GetRequestBody()
            do! Db.Project.asyncFullyUpdateProject project
            return Some { ctx with response = ctx.GetResponseWith project }
        }

    let asyncPatch (ctx: HttpContext) =
        async {
            let project = ctx.GetRequestBody<Project>()
            do! Db.Project.asyncPartiallyUpdateProject project
            return Some { ctx with response = ctx.GetResponseWith project }
        }

    let asyncOptions (ctx: HttpContext) =
        async {
            let response = ctx.GetOptionsResponseFor (SupportedHttpMethods.Project "GET, HEAD, POST, PUT, PATCH, DELETE")
            return Some { ctx with response = response }
        }

    let delete (id: int64) =
        if Db.Project.existsProject id then
            Db.Project.removeProject id
            setStatus HTTP_200
        else
            setStatus HTTP_204
