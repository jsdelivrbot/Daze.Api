
export type Tag = {
    Id: string
    TagName: string | undefined
}

export type Post = {
    id: string | undefined
    slug: string
    title: string
    hero_content: string | undefined
    content: string | undefined
    cover_image: string | undefined
    created_at: Date | undefined
    modified_at: Date | undefined
    tags: Tag[]
}
// Comments: seq<Comment>

export type Project = {
    id: string
    name: string
    description: string | undefined
    url: string | undefined
    published_year: number | undefined
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




