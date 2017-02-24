import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/models/post.model';

@Component({
    selector: 'adminPostsCreate',
    providers: [FormBuilder, PostService],
    templateUrl: 'app/admin/posts/create/admin.posts.create.template.html'
})
export class AdminPostsCreateComponent implements OnInit {
    public postForm: FormGroup;
    public post = new Post();
    constructor(private formBuilder: FormBuilder,
        private _postService: PostService) { }

    onFormSubmit(ev: MouseEvent) {
        if (this.post) {
            this._postService.createPost(this.post)
                .subscribe(r => console.log("post was inserted!"),
                err => console.log(err),
                () => { });
        }
    }

    onValueChanged(data?: Post) {
        this.post = !!data ? data : new Post();
    }

    ngOnInit() {
        this.postForm = this.formBuilder.group({
            title: [this.post.Title, Validators.required],
            content: [this.post.Content, Validators.required],
        });
        this.postForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
}