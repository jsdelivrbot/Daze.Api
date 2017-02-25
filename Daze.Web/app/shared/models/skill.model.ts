import ISkill = Daze.Interfaces.ISkill;
import ICourse = Daze.Interfaces.ICourse;

export class Skill implements ISkill {
    constructor(public Name: string | null, public Level: number | null) { }
    Id: string;
    Courses: Array<ICourse>;
    FocusArea: string;
}