// modules
import { NgModule, } from '@angular/core';
import { RouterModule, Route, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LeftNavbarComponent } from './leftnavbar/leftnavbar.component';
import { AvatarComponent } from './leftnavbar/avatar/avatar.component';
import { PostComponent } from './dashboard/posts/post.component';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { NotFoundComponent } from './shared/notfound.component';

import { AppComponent } from './app.component';
import { RoutesBuilder } from './infrastructure/RoutesBuilder';

const routes = new RoutesBuilder()
    .addRoute('posts', PostComponent)
    .addRoute('skills', SkillsComponent)
    .addRoute('projects', ProjectsComponent)
    .addDefault(PostComponent)
    .addNotFound(NotFoundComponent)
    .build();

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
