import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'posts',
    providers: [PostService],
    templateUrl: 'app/dashboard/posts/posts.template.html',
    styleUrls: ['app/dashboard/posts/posts.style.css']
})
export class PostsComponent implements OnInit {
    private static _numberOfClicks = 0;
    private _posts = new Array<IPost>();
    // private _pagedPosts = new Array<IPost>();
    private _isLoading = true;

    public numberOfItemsPerPage = 2;
    // public currentPage = 1;

    constructor(private _postService: PostService) { }

    // async onPageChanged(pageNumber: number) {
    //     this.currentPage = pageNumber;
    //     const posts = await this._postService.getPostsArrayified();

    //     const startingIndex = (this.currentPage - 1) * this.numberOfItemsPerPage;
    //     const endIndex = Math.min(startingIndex + this.numberOfItemsPerPage, posts.length);
    //     this._posts = new Array<IPost>();
    //     for (let i = startingIndex; i < endIndex; i++) {
    //         this._posts.push(posts[i]);
    //     }
    // }

    onLoadmore() {
        PostsComponent._numberOfClicks++;
        this._postService.getPosts()
            .skip(this._posts.length)
            .take(this.numberOfItemsPerPage)
            .subscribe(p => this._posts.push(p),
            _ => _,
            () => this._isLoading = false);
    }

    ngOnInit() {
        // this._postService.getPosts()
        //     .subscribe(p => this._posts.push(p),
        //     _ => _,
        //     () => {
        //         this._isLoading = false;
        //         PostsComponent._numberOfClicks = Math.min(this._posts.length / this.numberOfItemsPerPage);
        //     });

        this._postService.getPosts()
            .take(this.numberOfItemsPerPage)
            .subscribe(p => this._posts.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}

