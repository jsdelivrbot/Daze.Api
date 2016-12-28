// modules
import { NgModule, } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Route, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LeftNavbarComponent } from './leftnavbar/leftnavbar.component';
import { AvatarComponent } from './leftnavbar/avatar/avatar.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { PostComponent } from './dashboard/posts/post/post.component';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { NotFoundComponent } from './shared/notfound/notfound.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { AdminComponent } from './admin/admin.component';

import { AppComponent } from './app.component';
import { RoutesBuilder } from './infrastructure/routes_builder';

const routes = new RoutesBuilder()
    .addRoute('posts', PostsComponent)
    .addRoute('posts/:id', PostComponent)
    .addRoute('skills', SkillsComponent)
    .addRoute('projects', ProjectsComponent)
    .addRoute('admin', AdminComponent)
    .addDefault(PostsComponent)
    .addNotFound(NotFoundComponent)
    .build();

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        LeftNavbarComponent,
        AvatarComponent,
        PostsComponent,
        PostComponent,
        SkillsComponent,
        ProjectsComponent,
        NotFoundComponent,
        SpinnerComponent,
        AdminComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }




