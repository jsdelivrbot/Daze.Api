import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/retry';
import IProject = Daze.Interfaces.IProject;

@Injectable()
export class ProjectService {
    private static requestUri = 'http://localhost:21403/api/project/';
    constructor(private _http: Http) { }

    public getProjects() {
        return this._http.get(ProjectService.requestUri)
            .retry(3)
            .map(res => res.json() as Array<IProject>)
            .exhaustMap(projects => projects);
    }

    public getProjectsById(id: string) {
        this._http.get(`${ProjectService.requestUri}${id}`)
            .retry(3)
            .map(res => res.json() as IProject);
    }

    public addProject(project: IProject) {
        let headers = new Headers();
        return this._http.post(ProjectService.requestUri, project, {
            headers: headers
        });
    }
}

