// modules
import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// custom modules
import { LeftNavbarComponent } from './leftnavbar/leftnavbar.component';
import { AvatarComponent } from './leftnavbar/avatar/avatar.component';

import { DashboardComponent } from './dashboard/dashboard.component'
import { PostComponent } from './dashboard/posts/post.component'

import { RightNavbarComponent } from './rightnavbar/rightnavbar.component';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule
        // RouterModule.forRoot([
        //     { path: 'crisis-center', component: DashboardComponent }
        // ])
    ],
    declarations: [
        AppComponent,
        LeftNavbarComponent,
        AvatarComponent,
        DashboardComponent,
        PostComponent,
        RightNavbarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
