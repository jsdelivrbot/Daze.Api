import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
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
import { RouterBuilder } from './infrastructure/router-builder';
import { LoginGuard } from "./shared/guards/login.guard";
import { AuthService } from "./shared/services/auth.service";
import { MarkdownParserService } from './shared/services/markdown-parser.service';
import { MarkdownPipe } from './shared/pipes/markdown.pipe';
import { DomSanitizerPipe } from './shared/pipes/dom-sanitizer.pipe';

const routes = new RouterBuilder()
    .addRoute('posts', PostsComponent)
    .addRoute('posts/:id', PostComponent)
    .addRoute('skills', SkillsComponent)
    .addRoute('projects', ProjectsComponent)
    .addRoute('login', LoginComponent)
    .addRoute('admin', AdminComponent, true)
    .addRoute('admin/posts', AdminPostsComponent, true)
    .addRoute('admin/posts/create', AdminPostsCreateComponent, true)
    .addRoute('admin/posts/update/:id', AdminPostsUpdateComponent, true)
    .addRoute('admin/projects', AdminProjectsComponent, true)
    .addRoute('admin/projects/create', AdminProjectsCreateComponent, true)
    .addRoute('admin/projects/update/:id', AdminProjectsUpdateComponent, true)
    .addRoute('admin/skills', AdminSkillsComponent, true)
    .addRoute('admin/skills/create', AdminSkillsCreateComponent, true)
    .addRoute('admin/skills/update/:id', AdminSkillsUpdateComponent, true)
    .addDefault(PostsComponent)
    .addNotFound(NotFoundComponent)
    .build();

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        // CommonModule,
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
        AdminSkillsUpdateComponent,
        MarkdownPipe,
        DomSanitizerPipe
    ],
    providers: [
        MarkdownParserService,
        AuthService,
        LoginGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }