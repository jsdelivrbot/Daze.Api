import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginModel } from '../../shared/models/login.model';

@Injectable()
export class LoginService {
    private static requestUri = 'http://127.0.0.1:8080/api/authenticate/';
    constructor(private readonly _http: Http) { }

    authenticate(model: LoginModel) {
        const encodedCredentials = btoa(`${model.username}:${model.password}`);
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('authorization', `Basic ${encodedCredentials}`);
        return this._http.post(LoginService.requestUri, null, {
            headers: headers
        })
            .map(r => r.json() as boolean);
    }
}


