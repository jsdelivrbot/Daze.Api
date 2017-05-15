import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import IPost = Daze.Interfaces.IPost;
import ITag = Daze.Interfaces.ITag;
import IApiService = Daze.Interfaces.IApiService;

@Injectable()
export class PostService implements IApiService {
    readonly requestUri = 'http://127.0.0.1:8080/api/post/';
    constructor( @Inject(AuthService) private readonly _authService: AuthService,
        private readonly _http: Http) {
    }

    getPosts() {
        return this._http.get(this.requestUri)
            .retry(2)
            .map(res => res.json() as Array<IPost>)
            .exhaustMap(posts => posts);
    }

    getPagedPosts(page: number, pageSize: number) {
        return this._http
            .get(`${this.requestUri}${page}/${pageSize}`)
            .map(res => res.json() as Array<IPost>)
            .exhaustMap(posts => posts);
    }

    async getPostsArrayified() {
        return await this._http.get(this.requestUri)
            .retry(2)
            .map(res => res.json() as Array<IPost>)
            .toPromise();
    }

    findPostById(id: string) {
        return this._http.get(`${this.requestUri}${id}`)
            .retry(2)
            .map(res => res.json() as IPost);
    }

    createPost(post: IPost) {
        let headers = this._authService.generateHeadersFromStorage();
        headers.append('content-type', 'application/json');
        return this._http.post(this.requestUri, post, {
            headers: headers
        });
    }

    updatePost(post: IPost) {
        let headers = this._authService.generateHeadersFromStorage();
        headers.append('content-type', 'application/json');
        return this._http.put(this.requestUri, post, {
            headers: headers
        });
    }

    deletePost(id: string) {
        let headers = this._authService.generateHeadersFromStorage();
        return this._http.delete(`${this.requestUri}${id}`, {
            headers: headers
        });
    }
}