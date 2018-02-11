namespace Domain

open System

type Tag = {
    Id: int64
    TagName: string option }

type Post = {
    Id: int64
    Slug: string
    Title: string
    HeroContent: string option
    Content: string option
    CoverImage: string option
    CreatedAt: DateTime option
    ModifiedAt: DateTime option
    Tags: seq<Tag> }
    // Comments: seq<Comment>

type Project = {
    Id: int64
    ProjectName: string
    Description: string option
    Url: string option
    PublishedYear: int option }

type Skill = {
    Id: int64
    SkillName: string option
    Level: int option
    FocusArea: string option }
    // Courses: seq<Course>

type Course = {
    Id: int64
    CourseTag: string
    CourseTitle: string }

type LoginModel = {
    username: string
    password: string }
