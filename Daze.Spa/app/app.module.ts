import { NgModule } from '@angular/core';
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
import { UpComponent } from './shared/up/up.component';

import { LoginComponent } from './admin/login/login.component'
import { AdminComponent } from './admin/admin.component';
import { AdminPostsComponent } from './admin/posts/admin.posts.component';
import { AdminPostsCreateComponent } from './admin/posts/create/admin.posts.create.component';
import { AdminPostsUpdateComponent } from './admin/posts/update/admin.posts.update.component';
import { AdminProjectsComponent } from './admin/projects/admin.projects.component';
import { AdminProjectsCreateComponent } from './admin/projects/create/admin.projects.create.component';
import { AdminProjectsUpdateComponent } from './admin/projects/update/admin.projects.update.component';
import { AdminSkillsComponent } from './admin/skills/admin.skills.component';
import { AdminSkillsCreateComponent } from './admin/skills/create/admin.skills.create.component';
import { AdminSkillsUpdateComponent } from './admin/skills/update/admin.skills.update.component';

import { AppComponent } from './app.component';
import { RoutesBuilder } from './infrastructure/routes.builder';

const routes = new RoutesBuilder()
    .addRoute('posts', PostsComponent)
    .addRoute('posts/:id', PostComponent)
    .addRoute('skills', SkillsComponent)
    .addRoute('projects', ProjectsComponent)
    .addRoute('login', LoginComponent)
    .addRoute('admin', AdminComponent)
    .addRoute('admin/posts', AdminPostsComponent)
    .addRoute('admin/posts/create', AdminPostsCreateComponent)
    .addRoute('admin/posts/update/:id', AdminPostsUpdateComponent)
    .addRoute('admin/projects', AdminProjectsComponent)
    .addRoute('admin/projects/create', AdminProjectsCreateComponent)
    .addRoute('admin/projects/update/:id', AdminProjectsUpdateComponent)
    .addRoute('admin/skills', AdminSkillsComponent)
    .addRoute('admin/skills/create', AdminSkillsCreateComponent)
    .addRoute('admin/skills/update/:id', AdminSkillsUpdateComponent)
    .addDefault(PostsComponent)
    .addNotFound(NotFoundComponent)
    .build();

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
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
        PagerComponent,
        UpComponent,
        LoginComponent,
        AdminComponent,
        AdminPostsComponent,
        AdminPostsCreateComponent,
        AdminPostsUpdateComponent,
        AdminProjectsComponent,
        AdminProjectsCreateComponent,
        AdminProjectsUpdateComponent,
        AdminSkillsComponent,
        AdminSkillsCreateComponent,
        AdminSkillsUpdateComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }