import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import IApiService = Daze.Interfaces.IApiService;
import ITag = Daze.Interfaces.ITag;

@Injectable()
export class TagService implements IApiService {
    readonly requestUri = 'http://127.0.0.1:8080/api/tag/';

    constructor(private readonly _http: Http) { }

    getTags() {
        return this._http.get(this.requestUri)
            .map(r => r.json() as Array<ITag>)
            .exhaustMap(tags => tags);
    }
}

