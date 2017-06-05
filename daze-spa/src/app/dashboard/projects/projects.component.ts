import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import IProject = Daze.Interfaces.IProject;

@Component({
    selector: 'projects',
    providers: [ProjectService],
    templateUrl: './projects.template.html',
    styleUrls: ['./projects.style.css']
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