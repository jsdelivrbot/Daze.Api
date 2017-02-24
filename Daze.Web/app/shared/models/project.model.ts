import IProject = Daze.Interfaces.IProject;

export class Project implements IProject {
    Id: string;
    Name: string;
    Description: string;
    Url: string;
}