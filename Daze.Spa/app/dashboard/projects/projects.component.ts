import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import IProject = Daze.Interfaces.IProject;

@Component({
    selector: 'projects',
    providers: [ProjectService],
    styleUrls: ['app/dashboard/projects/projects.style.css'],
    templateUrl: 'app/dashboard/projects/projects.template.html'
})
export class ProjectsComponent implements OnInit {
    private _projects = new Array<IProject>();
    private _isLoading = true;
    constructor(private readonly _projectService: ProjectService) { }

    ngOnInit() {
        this._projectService.getProjects()
            .subscribe(p => this._projects.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}