import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Route } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'post',
    providers: [PostService],
    templateUrl: 'app/dashboard/posts/post/post.template.html'
})
export class PostComponent implements OnInit {
    private _post: IPost | null = null;
    constructor(private postService: PostService,
        private router: ActivatedRoute) { }

    ngOnInit() {
        this.router.params.subscribe(params => {
            const postId = params['id'];

            this.postService.getPostById(postId)
                .subscribe(post => {
                    this._post = post;
                    console.log(post)
                });
        });
    }
}


