import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service/posts.service';
import { Observable } from 'rxjs';
import IPost = Daze.Interfaces.IPost;
import 'rxjs/add/operator/take';

@Component({
    selector: 'posts',
    providers: [PostsService],
    templateUrl: 'app/dashboard/posts/posts.template.html',
    styleUrls: ['app/dashboard/posts/posts.style.css']
})
export class PostsComponent implements OnInit {
    private _posts = new Array<IPost>();
    private _pagedPosts = new Array<IPost>();
    private _isLoading = true;

    public numberOfItemsPerPage = 2;
    public currentPage = 1;

    constructor(private readonly _postService: PostsService) { }

    async onPageChanged(pageNumber: number) {
        this.currentPage = pageNumber;
        const posts = await this._postService.getPostsArrayified();

        const startingIndex = (this.currentPage - 1) * this.numberOfItemsPerPage;
        const endIndex = Math.min(startingIndex + this.numberOfItemsPerPage, posts.length);
        this._posts = new Array<IPost>();
        for (let i = startingIndex; i < endIndex; i++) {
            this._posts.push(posts[i]);
        }
    }

    ngOnInit() {
        this._postService.getPosts()
            .subscribe(post => this._posts.push(post),
            _ => _,
            () => this._isLoading = false);

        this._postService.getPosts()
            .take(2)
            .subscribe(post => this._pagedPosts.push(post),
            _ => _,
            () => this._isLoading = false);
    }
}

