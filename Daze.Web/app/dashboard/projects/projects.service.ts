import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import IProject = Daze.Interfaces.IProject;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';

@Injectable()
export class ProjectsService {
    private static jsonDataUrl = "./app/shared/data/projects.json";
    constructor(private _http: Http) { }

    getData() {
        return this._http.get(ProjectsService.jsonDataUrl)
            .map(res => res.json())
            .map(json => json['projects'] as Array<IProject>)
            .exhaustMap(projects => projects);
    }
}
