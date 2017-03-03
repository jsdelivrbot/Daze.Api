namespace Daze.Api.Domain

open System


type Tag = {
    Id: int64
    Name: string }

type Post = {
    Id: int64
    Slug: string
    Title: string
    Content: string option 
    CreatedAt: DateTime option
    ModifiedAt: DateTime option }
    // Tags: seq<Tag> }
    // Comments: seq<Comment>

type Course = {
    Id: int64
    CourseTag: string
    CourseTitle: string }

type Skill = {
    Id: int64
    Name: string option
    Level: int option
    FocusArea: string option }
    // Courses: seq<Course> 

type Project = {
    Id: int64
    Name: string
    Description: string option
    Url: string option }
