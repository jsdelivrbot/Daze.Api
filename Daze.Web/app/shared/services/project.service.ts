import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/retry';
import IProject = Daze.Interfaces.IProject;

@Injectable()
export class ProjectService {
    private static requestUri = 'http://127.0.0.1:8080/api/project/';
    // private static requestUri = 'http://localhost:21403/api/project/';
    constructor(private _http: Http) { }

    getProjects() {
        return this._http.get(ProjectService.requestUri)
            .retry(3)
            .map(res => res.json() as Array<IProject>)
            .exhaustMap(projects => projects);
    }

    getProjectsById(id: string) {
        this._http.get(`${ProjectService.requestUri}${id}`)
            .retry(3)
            .map(res => res.json() as IProject);
    }

    addProject(project: IProject) {
        let headers = new Headers();
        return this._http.post(ProjectService.requestUri, project, {
            headers: headers
        });
    }

    deleteProject(id: string) {
        return this._http.delete(`${ProjectService.requestUri}${id}`);
    }
}

