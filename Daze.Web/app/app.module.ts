import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LeftNavbarComponent } from './leftnavbar/leftnavbar.component';

import { DashboardComponent } from './dashboard/dashboard.component'
import { PostComponent } from './dashboard/posts/post.component'

import { RightNavbarComponent } from './rightnavbar/rightnavbar.component';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        LeftNavbarComponent,
        DashboardComponent,
        PostComponent,
        RightNavbarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
