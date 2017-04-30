namespace Daze.Api.Domain

open System

type Post = {
    Id: int64
    Slug: string
    Title: string 
    HeroContent: string option
    Content: string option 
    CreatedAt: DateTime option
    ModifiedAt: DateTime option
    Tags: seq<Tag> }
    // Comments: seq<Comment>

