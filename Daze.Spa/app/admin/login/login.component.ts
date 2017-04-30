import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../shared/models/login.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'login',
    providers: [FormBuilder, AuthService],
    templateUrl: 'app/admin/login/login.template.html',
    styleUrls: ['app/admin/login/login.style.css']
})
export class LoginComponent implements OnInit {
    private _loginForm: FormGroup;
    private _loginModel = new LoginModel();
    constructor(private readonly _authService: AuthService,
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute) { }

    onLoginFormSubmit($event: MouseEvent) {
        this._authService.authenticate(this._loginModel)
            .subscribe(r => {
                localStorage.removeItem('currentuser');
                localStorage.setItem('currentuser', JSON.stringify(this._loginModel));
            });
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
        this.onValueChange();
    }
}