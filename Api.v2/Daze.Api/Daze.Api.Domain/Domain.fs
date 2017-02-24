namespace Daze.Api.Domain

open System


type Tag = {
    Id: int64
    Name: string }

type Post = {
    Id: int64
    Slug: string
    Title: string
    Content: string
    CreatedAt: DateTime
    ModifiedAt: DateTime }
    // Tags: seq<Tag> }
    // Comments: seq<Comment>

type Course = {
    Id: int64
    CourseTag: string
    CourseTitle: string }

type Skill = {
    Id: int64
    Name: string
    Level: int
    FocusArea: string }
    // Courses: seq<Course> 

type Project = {
    Id: int64
    Name: string
    Description: string
    Url: string }
