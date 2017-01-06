import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FocusArea } from '../types/focusArea';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import ISkill = Daze.Interfaces.ISkill;

@Injectable()
export class SkillsService {
    private static requestUri = 'http://localhost:21403/api/skill/';
    constructor(private _http: Http) { }

    getSkills() {
        return this._http.get(SkillsService.requestUri)
            .retry(3)
            .map(res => res.json() as Array<ISkill>)
            .exhaustMap(skills => skills);
    }

    getSkillById(id: string) {
        return this._http.get(`${SkillsService.requestUri}${id}`)
            .retry(3)
            .map(res => res.json() as ISkill);
    }

    getSkillsByFocusArea(focusArea: FocusArea) {
        return this._http.get(SkillsService.requestUri)
            .retry(3)
            .map(res => res.json() as Array<ISkill>)
            .exhaustMap(skills => skills)
            .filter(skill => skill.focusArea == focusArea);
    }

    addSkill(skill: ISkill) {
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        return this._http.post(SkillsService.requestUri, skill, {
            headers: headers
        });
    }
}