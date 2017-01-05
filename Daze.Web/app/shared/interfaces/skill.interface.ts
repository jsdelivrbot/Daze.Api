namespace Daze.Interfaces {

    export interface ISkill {
        id?: string;
        name: string;
        level?: number;
        courses?: Array<ICourse>;
        focusArea?: string;
    }
}