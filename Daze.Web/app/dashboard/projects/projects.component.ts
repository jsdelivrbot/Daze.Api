import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import IProject = Daze.Interfaces.IProject;

@Component({
    selector: 'projects',
    providers: [ProjectsService],
    styleUrls: ['app/dashboard/projects/projects.style.css'],
    templateUrl: 'app/dashboard/projects/projects.template.html'
})
export class ProjectsComponent implements OnInit {
    private _projects = new Array<IProject>();
    constructor(private _projectsService: ProjectsService) { }

    ngOnInit() {
        this._projectsService.getData()
            .subscribe(project => this._projects.push(project));
    }
}