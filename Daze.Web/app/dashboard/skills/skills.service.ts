import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { FocusArea } from '../../shared/enums/focusArea';
import ISkill = Daze.Interfaces.ISkill;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';

@Injectable()
export class SkillsService {
    private static jsonDataUrl = "./app/shared/data/skills.json";
    constructor(private _http: Http) { }

    getData(focusArea: FocusArea) {
        let fs: string = null;
        switch (focusArea) {
            case FocusArea.languages: fs = "languages"; break;
            case FocusArea.databases: fs = "databases"; break;
            case FocusArea.frameworks: fs = "frameworks"; break;
        }

        return this._http.get(SkillsService.jsonDataUrl)
            .map(res => res.json())
            .map(data => data[fs] as Array<ISkill>)
            .exhaustMap(skills => skills);
    }
}