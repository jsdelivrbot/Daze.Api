import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPost } from '../../shared/interfaces/post.interface';
import { ITag } from '../../shared/interfaces/tag.interface';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';

// import IPost = Daze.Interfaces.IPost;
// import ITag = Daze.Interfaces.ITag;

@Injectable()
export class PostsService {
    private static urlEndpoint = 'http://localhost:21403/api/post/';
    constructor(private readonly _http: Http) { }

    getPosts() {
        let posts = new Array<IPost>();
        this._http
            .get(PostsService.urlEndpoint)
            .map(res => res.json() as Array<IPost>)
            .exhaustMap(posts => posts)
            .subscribe(post => posts.push(post));
        return posts;
    }
}