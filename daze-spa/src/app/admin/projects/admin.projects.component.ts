import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import IProject = Daze.Interfaces.IProject;

@Component({
    selector: 'adminProjects',
    providers: [ProjectService],
    templateUrl: './admin.projects.template.html',
    styleUrls: ['./../admin.style.css']
})
export class AdminProjectsComponent implements OnInit {
    private _projects = new Array<IProject>();
    private _isLoading = true;
    private _selectedProject: IProject | undefined | null = null;
    constructor(private readonly _projectService: ProjectService) { }

    onProjectClick(id: string) {
        this._selectedProject = this._projects.find(p => p.Id == id);
    }

    onProjectDelete(id: string) {
        this._projectService.deleteProject(id)
            .subscribe(res => (res.status == 200)
                ? console.log("project deleted")
                : console.log("error"));
        this._projects = this._projects.filter(p => p.Id != id);
        this._selectedProject = null;
    }

    ngOnInit() {
        this._projectService.getProjects()
            .subscribe(p => this._projects.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}