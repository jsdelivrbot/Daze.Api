import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import IApiService = Daze.Interfaces.IApiService;


@Injectable()
export class VersionService implements IApiService {
    readonly requestUri = 'http://127.0.0.1:8080/api/version/';
    constructor(private readonly _http: Http) { }

    getVersion() {
        return this._http.get(this.requestUri)
            .map(r => r.json() as string);
    }
}


