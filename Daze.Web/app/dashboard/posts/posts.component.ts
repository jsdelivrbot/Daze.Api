import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { IPost } from '../../shared/interfaces/post.interface';

@Component({
    selector: 'post',
    providers: [PostsService],
    templateUrl: 'app/dashboard/posts/posts.template.html',
    styleUrls: ['app/dashboard/posts/posts.style.css']
})
export class PostsComponent implements OnInit {
    private _posts = new Array<IPost>();
    constructor(private readonly _postService: PostsService) { }

    ngOnInit() {
        this._posts = this._postService.getPosts();
    }
}

