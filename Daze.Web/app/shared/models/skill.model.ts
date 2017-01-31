import ISkill = Daze.Interfaces.ISkill;
import ICourse = Daze.Interfaces.ICourse;

export class Skill implements ISkill {
    constructor(public name: string | null, public level: number | null) { }
    id: string;
    courses: Array<ICourse>;
    focusArea: string;
}