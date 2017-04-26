import { Injectable, Inject } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor( @Inject(AuthService) private readonly _authService: AuthService,
        private readonly _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = localStorage.getItem('currentuser');
        if (currentUser) {
            return this._authService.authenticate(JSON.parse(currentUser));
        }
        console.log("LoginGuard: The user is not logged in and can't navigate to desired page");
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}