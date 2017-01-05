import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FocusArea } from '../types/focusArea';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import ISkill = Daze.Interfaces.ISkill;

@Injectable()
export class SkillsService {
    private static requestUri = 'http://localhost:21403/api/skill/';
    constructor(private _http: Http) { }

    getSkills() {
        return this._http.get(SkillsService.requestUri)
            .map(res => res.json() as Array<ISkill>)
            .exhaustMap(skills => skills);
    }

    getSkillsByFocusArea(focusArea: FocusArea) {
        return this._http.get(SkillsService.requestUri)
            .map(res => res.json() as Array<ISkill>)
            .exhaustMap(skills => skills)
            .filter(skill => skill.focusArea == focusArea);
    }

    addSkills() {

    }
}