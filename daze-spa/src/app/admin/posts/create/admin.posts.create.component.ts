import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../shared/services/post.service';
import { TagService } from '../../../shared/services/tag.service';
import { MarkdownParserService } from '../../../shared/services/markdown-parser.service';
import { Post } from '../../../shared/models/post.model';

@Component({
    selector: 'adminPostsCreate',
    providers: [FormBuilder, PostService, TagService, MarkdownParserService],
    templateUrl: './admin.posts.create.template.html',
    styleUrls: ['./admin.posts.create.style.css']
})
export class AdminPostsCreateComponent implements OnInit {
    public postForm: FormGroup;
    public post = new Post();
    public parsedText = '';
    constructor(private readonly _postService: PostService,
        private readonly _tagService: TagService,
        private readonly _mdParserService: MarkdownParserService,
        private readonly _formBuilder: FormBuilder) { }

    updateOutput(value: string) {
        this.parsedText = this._mdParserService.convertToHtml(value);
    }

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
        this.postForm = this._formBuilder.group({
            title: [this.post.Title, Validators.required],
            content: [this.post.Content, Validators.required],
            slug: [this.post.Slug, Validators.required]
        });
        this.postForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
}