import IProject = Daze.Interfaces.IProject;

export class Project implements IProject {
    Id: string;
    ProjectName: string;
    Description: string;
    Url: string;
}