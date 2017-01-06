import { Component } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'adminPosts',
    providers: [PostsService],
    styleUrls: ['app/admin/admin.style.css'],
    templateUrl: 'app/admin/posts/admin.posts.template.html'
})
export class AdminPostsComponent {
    private _posts = new Array<IPost>();
    private _selectedPost: IPost = null;
    private _isPostSelected = false;
    private _isLoading = true;
    constructor(private _postsService: PostsService) { }

    onPostClick(id: number) {
        this._selectedPost = this._posts.find(p => p.id == id);
        this._isPostSelected = true;
    }

    ngOnInit() {
        this._postsService.getPosts()
            .subscribe(p => this._posts.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}

