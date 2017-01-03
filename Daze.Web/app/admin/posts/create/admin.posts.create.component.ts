import { Inject, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../shared/posts.service/posts.service';
import { Post } from '../../../shared/models/post.model';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'adminPostsCreate',
    providers: [FormBuilder, PostsService],
    templateUrl: 'app/admin/posts/create/admin.posts.create.template.html'
})
export class AdminPostsCreateComponent implements OnInit {
    public postForm: FormGroup;
    public post = new Post();
    constructor(private formBuilder: FormBuilder,
        private _postsService: PostsService) { }

    onFormSubmit(ev: MouseEvent) {
        console.log(this.post);
        if (this.post) {
            this._postsService.addPost(this.post)
                .subscribe(res => console.log("post was inserted!"),
                err => console.log(err),
                () => { });
        }
    }

    onValueChanged(data?: Post) {
        this.post = data;
    }

    ngOnInit() {
        this.postForm = this.formBuilder.group({
            title: [this.post.title, Validators.required],
            content: [this.post.content, Validators.required],
        });
        this.postForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
}