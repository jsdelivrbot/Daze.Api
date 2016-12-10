import { ICourse } from './course.interface'

export interface ISkill {
    name: string
    courses: Array<ICourse>
    // level: number;
}