namespace Daze.Api.Domain

type Skill = {
    Id: int64
    SkillName: string option
    Level: int option
    FocusArea: string option }
    // Courses: seq<Course>
