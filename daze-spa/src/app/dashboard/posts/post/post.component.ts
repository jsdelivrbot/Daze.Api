import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
// import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'post',
    providers: [PostService],
    templateUrl: './post.template.html',
    styleUrls: ['./post.style.css']
})
export class PostComponent implements OnInit {
    private _post: IPost | null = null;
    constructor(private readonly _postService: PostService,
        private readonly _router: ActivatedRoute) { }

    ngOnInit() {
        this._router.params.subscribe(p => {
            const postId = p['id'];
            this._postService.findPostById(postId)
                .subscribe(post => {
                    this._post = post;
                    console.log('post', post);
                });
        });
    }
}


