namespace Daze.Interfaces {

    export interface ISkill {
        name: string;
        courses?: Array<ICourse>;
        level: number;
    }
}