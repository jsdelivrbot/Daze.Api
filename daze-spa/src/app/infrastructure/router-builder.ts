import { Route } from '@angular/router';
import { LoginGuard } from "../shared/guards/login.guard";

export class RouterBuilder {
    private routes: Array<Route> = new Array<Route>();

    addRoute(path: string, component: any, withLoginGuard: boolean = false) {
        this.routes.push({
            path: path,
            component: component,
            canActivate: !!withLoginGuard ? [LoginGuard] : []
        });
        return this;
    }

    // obsolete
    addRoute2(path: string, component: any, test: string) {
        this.routes.push({
            path: path,
            component: component
        });
        return this;
    }

    addDefault(component: any) {
        this.routes.push({
            path: '',
            component: component
        });
        return this;
    }

    addNotFound(component: any) {
        this.routes.push({
            path: '**',
            component: component
        });
        return this;
    }

    build() {
        return this.routes;
    }
}