import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import IPost = Daze.Interfaces.IPost;
import ITag = Daze.Interfaces.ITag;
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {
    private static requestUri = 'http://localhost:21403/api/post/';
    constructor(private readonly _http: Http) { }

    getPosts() {
        return this._http
            .get(PostsService.requestUri)
            .map(res => res.json() as Array<IPost>)
            .exhaustMap(posts => posts);
    }

    getPostById(id: string) {
        return this._http.get(`${PostsService.requestUri}${id}`)
            .map(res => res.json() as IPost);
    }

}