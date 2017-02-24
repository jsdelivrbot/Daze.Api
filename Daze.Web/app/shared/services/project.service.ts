import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/retry';
import IProject = Daze.Interfaces.IProject;

@Injectable()
export class ProjectService {
    private static requestUri = 'http://127.0.0.1:8080/api/project/';
    constructor(private _http: Http) { }

    getProjects() {
        return this._http.get(ProjectService.requestUri)
            .retry(3)
            .map(res => res.json() as Array<IProject>)
            .exhaustMap(projects => projects);
    }

    findProjectById(id: string) {
        return this._http.get(`${ProjectService.requestUri}${id}`)
            .retry(3)
            .map(res => res.json() as IProject);
    }

    createProject(project: IProject) {
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        return this._http.post(ProjectService.requestUri, project, {
            headers: headers
        });
    }

    updateProject(project: IProject) {
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        return this._http.put(ProjectService.requestUri, project, {
            headers: headers
        });
    }

    deleteProject(id: string) {
        return this._http.delete(`${ProjectService.requestUri}${id}`);
    }
}

