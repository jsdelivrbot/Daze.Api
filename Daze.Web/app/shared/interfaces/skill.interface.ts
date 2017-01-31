namespace Daze.Interfaces {

    export interface ISkill {
        id: string;
        name: string | null;
        level: number | null;
        courses: Array<ICourse>;
        focusArea: string;
    }
}