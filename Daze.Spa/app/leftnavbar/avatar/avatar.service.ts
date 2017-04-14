import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Avatar } from '../../shared/models/avatar.model';
import IAvatar = Daze.Interfaces.IAvatar;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class AvatarService {
    private static urlEndpoint = "./app/shared/data/avatar.json";
    constructor(private readonly http: Http) { }

    getAvatarInfo() {
        return this.http
            .get(AvatarService.urlEndpoint)
            .map(res => res.json() as IAvatar);
    }
}