import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import IProject = Daze.Interfaces.IProject;

@Component({
    selector: 'adminProjects',
    providers: [ProjectService],
    styleUrls: ['app/admin/admin.style.css'],
    templateUrl: 'app/admin/projects/admin.projects.template.html'
})
export class AdminProjectsComponent implements OnInit {
    private _projects = new Array<IProject>();
    private _isLoading = true;
    private _selectedProject: IProject | undefined | null = null;
    private _isProjectSelected = false;
    constructor(private _projectService: ProjectService) { }

    onProjectClick(id: string) {
        this._selectedProject = this._projects.find(p => p.id == id);
        this._isProjectSelected = true;
    }

    ngOnInit() {
        this._projectService.getProjects()
            .subscribe(p => this._projects.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}