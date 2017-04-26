import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/retry';
import IProject = Daze.Interfaces.IProject;
import IApiService = Daze.Interfaces.IApiService;
1

@Injectable()
export class ProjectService implements IApiService {
    readonly requestUri = 'http://127.0.0.1:8080/api/project/';
    constructor(private readonly _http: Http) { }

    getProjects() {
        return this._http.get(this.requestUri)
            .retry(3)
            .map(res => res.json() as Array<IProject>)
            .exhaustMap(projects => projects);
    }

    findProjectById(id: string) {
        return this._http.get(`${this.requestUri}${id}`)
            .retry(3)
            .map(res => res.json() as IProject);
    }

    createProject(project: IProject) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.requestUri, project, {
            headers: headers,
            withCredentials: true
        });
    }

    updateProject(project: IProject) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(this.requestUri, project, {
            headers: headers
        });
    }

    deleteProject(id: string) {
        return this._http.delete(`${this.requestUri}${id}`);
    }
}

