import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service/posts.service';
import IPost = Daze.Interfaces.IPost;
import { Observable } from 'rxjs';

@Component({
    selector: 'posts',
    providers: [PostsService],
    templateUrl: 'app/dashboard/posts/posts.template.html',
    styleUrls: ['app/dashboard/posts/posts.style.css']
})
export class PostsComponent implements OnInit {
    private _posts = new Array<IPost>();
    private _isLoading = true;
    constructor(private readonly _postService: PostsService) { }

    ngOnInit() {
        let result = this._postService.getPosts()
            .subscribe(
            post => this._posts.push(post),
            _ => _,
            () => this._isLoading = false);
    }
}

