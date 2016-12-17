import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPost } from '../../interfaces';
import { ITag } from '../../interfaces';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';


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