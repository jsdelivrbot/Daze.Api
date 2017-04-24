import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
// import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'post',
    providers: [PostService],
    templateUrl: 'app/dashboard/posts/post/post.template.html',
    styleUrls: ['app/dashboard/posts/post/post.style.css']
})
export class PostComponent implements OnInit {
    private _post: IPost | null = null;
    constructor(private postService: PostService,
        private router: ActivatedRoute) { }

    ngOnInit() {
        this.router.params.subscribe(p => {
            const postId = p['id'];
            this.postService.findPostById(postId)
                .subscribe(post => {
                    this._post = post;
                    console.log('post', post);
                });
        });
    }
}


