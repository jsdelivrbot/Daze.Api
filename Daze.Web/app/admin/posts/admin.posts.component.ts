import { Component } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'adminPosts',
    providers: [PostService],
    styleUrls: ['app/admin/admin.style.css'],
    templateUrl: 'app/admin/posts/admin.posts.template.html'
})
export class AdminPostsComponent {
    private _posts = new Array<IPost>();
    private _selectedPost: IPost | null | undefined = null;
    private _isPostSelected = false;
    private _isLoading = true;
    constructor(private _postService: PostService) { }

    onPostClick(id: string) {
        this._selectedPost = this._posts.find(p => p.id == id);
        this._isPostSelected = true;
    }

    ngOnInit() {
        this._postService.getPosts()
            .subscribe(p => this._posts.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}

