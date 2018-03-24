
export type Tag = {
    id: string
    name: string | undefined
};

export type Post = {
    id: string | undefined
    slug: string
    title: string
    heroContent: string | undefined
    content: string | undefined
    coverImage: string | undefined
    createdAt: Date | undefined
    modifiedAt: Date | undefined
    tags: Tag[]
};
// Comments: seq<Comment>

export type Project = {
    id: string
    name: string
    description: string | undefined
    url: string | undefined
    published_year: number | undefined
};

export type Skill = {
    Id: string
    SkillName: string | undefined
    Level: number | undefined
    FocusArea: string | undefined
};
// Courses: seq<Course>

export type Course = {
    Id: string
    CourseTag: string
    CourseTitle: string
};

export type LoginModel = {
    username: string
    password: string
};




