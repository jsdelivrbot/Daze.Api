
export type Tag = {
    Id: string
    TagName: string | undefined
}

export type Post = {
    Id: string | undefined
    Slug: string
    Title: string
    HeroContent: string | undefined
    Content: string | undefined
    CoverImage: string | undefined
    CreatedAt: Date | undefined
    ModifiedAt: Date | undefined
    Tags: Tag[]
}
// Comments: seq<Comment>

export type Project = {
    Id: string
    ProjectName: string
    Description: string | undefined
    Url: string | undefined
    PublishedYear: number | undefined
}

export type Skill = {
    Id: string
    SkillName: string | undefined
    Level: number | undefined
    FocusArea: string | undefined
}
// Courses: seq<Course>

export type Course = {
    Id: string
    CourseTag: string
    CourseTitle: string
}

export type LoginModel = {
    username: string
    password: string
}




