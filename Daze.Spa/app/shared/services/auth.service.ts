import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginModel } from '../../shared/models/login.model';
import IApiService = Daze.Interfaces.IApiService;

@Injectable()
export class AuthService implements IApiService {
    readonly requestUri = 'http://127.0.0.1:8080/api/authenticate/';
    constructor(private readonly _http: Http) { }

    authenticate(model: LoginModel) {
        console.log('model', model);
        const encodedCredentials = btoa(`${model.username}:${model.password}`);
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('authorization', `Basic ${encodedCredentials}`);
        return this._http.post(this.requestUri, null, {
            headers: headers
        })
            .map(r => r.json() as boolean);
    }

    generateHeadersFromStorage() {
        let currentUser = JSON.parse(localStorage.getItem('currentuser')) as LoginModel;
        if (currentUser) {
            const encodedCredentials = btoa(`${currentUser.username}:${currentUser.password}`);
            let headers = new Headers();
            headers.append('authorization', `Basic ${encodedCredentials}`);
            return headers;
        }
        console.log("Could not generate headers, the user is not logged in");
        return null;
    }

    /** @deprecated  don`t use login */
    login(username: string, password: string) { }
    /** @deprecated don`t use logout */
    logout() { }
}


