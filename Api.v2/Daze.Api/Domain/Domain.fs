namespace Daze.Domain

open System

type Tag = {
    Id: Guid
    Name: string }

type Post = {
    Id: Guid
    Slug: string
    Title: string
    Content: string
    CreatedAt: DateTime
    ModifiedAt: DateTime
    Tags: seq<Tag> }
    // Comments: seq<Comment>

type Course = {
    Id: Guid
    CourseTag: string
    CourseTitle: string }

type Skill = {
    Id: Guid
    Name: string
    Level: int
    FocusArea: string
    Courses: seq<Course> }

type Project = {
    Id: Guid
    Name: string
    Description: string
    Url: string }
