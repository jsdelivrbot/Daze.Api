import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../shared/models/login.model';

@Component({
    selector: 'login',
    providers: [FormBuilder],
    templateUrl: 'app/admin/login/login.template.html',
    styleUrls: ['app/admin/login/login.style.css']
})
export class LoginComponent implements OnInit {
    private _loginForm: FormGroup;
    private _loginModel = new LoginModel();
    constructor(private _formBuilder: FormBuilder) { }

    onLoginFormSubmit($event: MouseEvent) {
        // post to login function
        console.log('_loginForm', this._loginModel)
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