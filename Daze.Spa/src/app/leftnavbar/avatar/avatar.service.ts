import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Avatar } from '../../shared/models/avatar.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import IAvatar = Daze.Interfaces.IAvatar;
import IApiService = Daze.Interfaces.IApiService;

@Injectable()
export class AvatarService implements IApiService {
    readonly requestUri = "./../../shared./shared/data/avatar.json";
    constructor(private readonly _http: Http) { }

    getAvatarInfo() {
        // return this._http
        //     .get(this.requestUri)
        //     .map(res => res.json() as IAvatar);
    }
}