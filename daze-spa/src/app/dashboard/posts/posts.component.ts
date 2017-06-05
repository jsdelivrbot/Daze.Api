import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'posts',
    providers: [PostService],
    templateUrl: './posts.template.html',
    styleUrls: ['./posts.style.css']
})
export class PostsComponent implements OnInit {
    private static _currentPage = 1;
    private _posts = new Array<IPost>();
    private _isLoading = true;
    private _numberOfItemsPerPage = 2;
    constructor(private readonly _postService: PostService) { }

    onLoadmore() {
        ++PostsComponent._currentPage;

        this._postService.getPagedPosts(PostsComponent._currentPage, this._numberOfItemsPerPage)
            .subscribe(p => this._posts.push(p),
            _ => _,
            () => this._isLoading = false);
    }

    ngOnInit() {
        this._postService.getPagedPosts(1, this._numberOfItemsPerPage)
            .subscribe(p => this._posts.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}
