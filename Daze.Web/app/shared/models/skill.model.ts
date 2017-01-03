import ISkill = Daze.Interfaces.ISkill;

export class Skill implements ISkill {
    constructor(public name: string, public level: number) { }
}