import ISkill = Daze.Interfaces.ISkill;

export class Skill implements ISkill {
    constructor(public Name: string | null, public Level: number | null) { }
}