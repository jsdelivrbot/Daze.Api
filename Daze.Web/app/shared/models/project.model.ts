import IProject = Daze.Interfaces.IProject;

export class Project implements IProject {
    id: string;
    name: string;
    description: string;
    url: string;
}