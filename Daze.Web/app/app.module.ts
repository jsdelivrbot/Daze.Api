import { NgModule, } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Route, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LeftNavbarComponent } from './leftnavbar/leftnavbar.component';
import { AvatarComponent } from './leftnavbar/avatar/avatar.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { PostComponent } from './dashboard/posts/post/post.component';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { NotFoundComponent } from './shared/notfound/notfound.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PagerComponent } from './shared/pager/pager.component';

import { AdminComponent } from './admin/admin.component';
import { AdminPostsComponent } from './admin/posts/admin.posts.component';
import { AdminPostsCreateComponent } from './admin/posts/create/admin.posts.create.component';
import { AdminProjectsComponent } from './admin/projects/admin.projects.component';
import { AdminProjectsCreateComponent } from './admin/projects/create/admin.projects.create.component';
import { AdminSkillsComponent } from './admin/skills/admin.skills.component';
import { AdminSkillsCreateComponent } from './admin/skills/create/admin.skills.create.component';

import { AppComponent } from './app.component';
import { RoutesBuilder } from './infrastructure/routesBuilder';

const routes = new RoutesBuilder()
    .addRoute('posts', PostsComponent)
    .addRoute('posts/:id', PostComponent)
    .addRoute('skills', SkillsComponent)
    .addRoute('projects', ProjectsComponent)
    .addRoute('admin', AdminComponent)
    .addRoute('admin/posts', AdminPostsComponent)
    .addRoute('admin/posts/create', AdminPostsCreateComponent)
    .addRoute('admin/projects', AdminProjectsComponent)
    .addRoute('admin/projects/create', AdminProjectsCreateComponent)
    .addRoute('admin/skills', AdminSkillsComponent)
    .addRoute('admin/skills/create', AdminSkillsCreateComponent)
    .addDefault(PostsComponent)
    .addNotFound(NotFoundComponent)
    .build();

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
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
        PagerComponent,
        AdminComponent,
        AdminPostsComponent,
        AdminPostsCreateComponent,
        AdminProjectsComponent,
        AdminProjectsCreateComponent,
        AdminSkillsComponent,
        AdminSkillsCreateComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }




