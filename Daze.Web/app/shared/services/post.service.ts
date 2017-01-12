import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import IPost = Daze.Interfaces.IPost;
import ITag = Daze.Interfaces.ITag;

@Injectable()
export class PostService {
    private static requestUri = 'http://localhost:21403/api/post/';
    constructor(private readonly _http: Http) { }

    getPosts() {
        return this._http
            .get(PostService.requestUri)
            .retry(2)
            .map(res => res.json() as Array<IPost>)
            .exhaustMap(posts => posts);
    }

    async getPostsArrayified() {
        return await this._http
            .get(PostService.requestUri)
            .retry(2)
            .map(res => res.json() as Array<IPost>)
            .toPromise();
    }

    getPostById(id: string) {
        return this._http.get(`${PostService.requestUri}${id}`)
            .retry(2)
            .map(res => res.json() as IPost);
    }

    addPost(post: IPost) {
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        return this._http.post(PostService.requestUri, post, {
            headers: headers
        });
    }

    deletePost(id: string) {
        return this._http.delete(`${PostService.requestUri}${id}`);
    }
}