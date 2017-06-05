import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginModel } from '../../shared/models/login.model';
import IApiService = Daze.Interfaces.IApiService;
import ILoginResponse = Daze.Interfaces.ILoginResponse;

@Injectable()
export class AuthService implements IApiService {
    readonly requestUri = 'http://127.0.0.1:8080/api/authenticate/';
    readonly loginRequestUri = 'http://127.0.0.1:8080/api/login/';
    constructor(private readonly _http: Http) { }

    authenticate(model: LoginModel) {
        const encodedCredentials = btoa(`${model.username}:${model.password}`)
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('authorization', `Basic ${encodedCredentials}`);
        return this._http.post(this.requestUri, null, {
            headers: headers
        })
            .map(r => r.json() as boolean);
    }

    login(model: LoginModel) {
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        this._http.post(this.loginRequestUri, model, {
            headers: headers
        })
            .map(r => r.json() as ILoginResponse)
            .subscribe(r => {
                localStorage.removeItem('currentuser');
                if (r.success == 'True') {
                    localStorage.setItem('currentuser', JSON.stringify({
                        username: model.username,
                        password: r.password
                    }));
                }
            });
    }


    generateHeadersFromStorage() {
        const currentUser = JSON.parse(localStorage.getItem('currentuser')) as LoginModel;
        if (currentUser) {
            let headers = new Headers();
            headers.append('authorization', `Basic ${currentUser.password}`);
            return headers;
        }
        console.log("Could not generate headers, the user is not logged in");
        return null;
    }

    /** @deprecated don`t use logout */
    logout() { }
}


