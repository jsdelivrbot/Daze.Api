// modules
import { NgModule, } from '@angular/core';
import { RouterModule, Route, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LeftNavbarComponent } from './leftnavbar/leftnavbar.component';
import { AvatarComponent } from './leftnavbar/avatar/avatar.component';
import { PostComponent } from './dashboard/posts/post.component';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { NotFoundComponent } from './errorpages/notfound.component';

import { AppComponent } from './app.component';


const routes: Array<Route> = [
    {
        path: 'posts',
        component: PostComponent
    },
    {
        path: 'skills',
        component: SkillsComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: '',
        component: PostComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        LeftNavbarComponent,
        AvatarComponent,
        PostComponent,
        SkillsComponent,
        ProjectsComponent,
        NotFoundComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
