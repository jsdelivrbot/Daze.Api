import { Component, OnInit } from '@angular/core'
import { PostService } from '../../../shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Post } from '../../../shared/models/post.model';

@Component({
    selector: 'adminPostsUpdate',
    providers: [PostService, FormBuilder],
    templateUrl: './admin.posts.update.template.html',
    styleUrls: ['./admin.posts.update.style.css']
})
export class AdminPostsUpdateComponent implements OnInit {
    private _post: Post = null;
    private _postId: string;
    private _updatePostForm: FormGroup;
    constructor(private readonly _postService: PostService,
        private readonly _router: ActivatedRoute,
        private readonly _formBuilder: FormBuilder) { }

    onFormSubmit(event: MouseEvent) {
        if (this._post) {
            this._post.Id = this._postId;
            this._postService.updatePost(this._post)
                .subscribe(p => console.log('p was added, ', p),
                err => console.log(err),
                () => { });
        }
    }

    onValueChanged(data?: Post) {
        this._post = !!data ? data : new Post();
    }

    populateForm(post?: Post) {
        if (post) {
            this._updatePostForm = this._formBuilder.group({
                title: [post.Title, Validators.required],
                content: [post.Content, Validators.required]
            });
            this._updatePostForm.valueChanges.subscribe(data => this.onValueChanged(data));
            this.onValueChanged(); // (re)set validation messages now
        } else {
            this._updatePostForm = this._formBuilder.group({
                title: new FormControl(),
                content: new FormControl()
            });
        }
    }

    ngOnInit() {
        this.populateForm();
        this._router.params.subscribe(par => {
            const postId = par['id'];
            this._postId = postId;
            this._postService.findPostById(postId)
                .subscribe(p => {
                    this._post = p;
                    this.populateForm(p);
                });
        });
    }
}