import ISkill = Daze.Interfaces.ISkill;
import ICourse = Daze.Interfaces.ICourse;

export class Skill implements ISkill {
<<<<<<< HEAD
    constructor(public name: string | null, public level: number | null) { }
    id: string;
    courses: Array<ICourse>;
    focusArea: string;
=======
    constructor(public Name: string | null, public Level: number | null) { }
>>>>>>> suaveapi
}