import { Route } from '@angular/router';

export class RoutesBuilder {
    private routes: Array<Route> = new Array<Route>();

    addRoute(path: string, component: any) {
        this.routes.push({
            path: path,
            component: component
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