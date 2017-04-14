namespace Daze.Api.Domain

type Project = {
    Id: int64
    ProjectName: string
    Description: string option
    Url: string option }
