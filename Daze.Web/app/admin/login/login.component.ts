import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginModel } from '../../shared/models/login.model';

@Component({
    selector: 'login',
    providers: [FormBuilder, LoginService],
    templateUrl: 'app/admin/login/login.template.html',
    styleUrls: ['app/admin/login/login.style.css']
})
export class LoginComponent implements OnInit {
    private _loginForm: FormGroup;
    private _loginModel = new LoginModel();
    constructor(private _formBuilder: FormBuilder,
        private _loginService: LoginService) { }

    onLoginFormSubmit($event: MouseEvent) {
        // post to login function
        console.log('_loginForm', this._loginModel);
        this._loginService.authenticate(this._loginModel)
            .subscribe(r => console.log(r));
    }

    onValueChange(loginData?: LoginModel) {
        this._loginModel = !!loginData ? loginData : new LoginModel();
    }

    ngOnInit() {
        this._loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this._loginForm.valueChanges.subscribe(data => this.onValueChange(data));
        this.onValueChange()
    }
}