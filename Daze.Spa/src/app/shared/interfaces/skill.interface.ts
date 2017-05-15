namespace Daze.Interfaces {

    export interface ISkill {
        Id: string;
        Name: string | null;
        Level: number | null;
        Courses: Array<ICourse>;
        FocusArea: string;
    }
}