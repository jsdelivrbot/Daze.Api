import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FocusArea } from '../types/focus_area';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import ISkill = Daze.Interfaces.ISkill;
import IApiService = Daze.Interfaces.IApiService;

@Injectable()
export class SkillService implements IApiService {
    readonly requestUri = 'http://127.0.0.1:8080/api/skill/';
    constructor( @Inject(AuthService) private readonly _authService: AuthService,
        private readonly _http: Http) { }

    getSkills() {
        return this._http.get(this.requestUri)
            .retry(3)
            .map(res => res.json() as Array<ISkill>)
            .exhaustMap(skills => skills);
    }

    getSkillsByFocusArea(focusArea: FocusArea) {
        return this._http.get(this.requestUri)
            .retry(3)
            .map(res => res.json() as Array<ISkill>)
            .exhaustMap(skills => skills)
            .filter(skill => skill.FocusArea == focusArea);
    }

    findSkillById(id: string) {
        return this._http.get(`${this.requestUri}${id}`)
            .retry(3)
            .map(res => res.json() as ISkill);
    }

    updateSkill(skill: ISkill) {
        let headers = this._authService.generateHeadersFromStorage();
        headers.append('content-type', 'application/json');
        return this._http.put(this.requestUri, skill, {
            headers: headers
        });
    }

    createSkill(skill: ISkill) {
        let headers = this._authService.generateHeadersFromStorage();
        headers.append('content-type', 'application/json');
        return this._http.post(this.requestUri, skill, {
            headers: headers
        });
    }

    deleteSkill(id: string) {
        let headers = this._authService.generateHeadersFromStorage();
        return this._http.delete(`${this.requestUri}${id}`, {
            headers: headers
        });
    }
}