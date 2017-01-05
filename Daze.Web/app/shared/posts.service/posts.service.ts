import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import IPost = Daze.Interfaces.IPost;
import ITag = Daze.Interfaces.ITag;

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

    async getPostsArrayified() {
        return await this._http
            .get(PostsService.requestUri)
            .map(res => res.json() as Array<IPost>)
            .toPromise();
    }

    getPostById(id: string) {
        return this._http.get(`${PostsService.requestUri}${id}`)
            .map(res => res.json() as IPost);
    }

    addPost(post: IPost) {

        let headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('accept', 'application/json');
        return this._http.post(PostsService.requestUri, JSON.stringify(post), {
            headers: headers
        })
            .map(res => res.json());
    }

}