import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Route } from '@angular/router';
import { PostsService } from '../../../shared/posts.service/posts.service';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'post',
    providers: [PostsService],
    templateUrl: 'app/dashboard/posts/post/post.template.html'
})
export class PostComponent implements OnInit {
    private _post: IPost = null;
    constructor(private postsService: PostsService,
        private router: ActivatedRoute) { }

    ngOnInit() {
        this.router.params.subscribe(params => {
            const postId = params['id'];

            this.postsService.getPostById(postId)
                .subscribe(post => {
                    this._post = post;
                    console.log(post)
                });
        });
    }
}


