import { Component } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import IPost = Daze.Interfaces.IPost;

@Component({
    selector: 'adminPosts',
    providers: [PostService],
    styleUrls: ['../admin.style.css'],
    templateUrl: './admin.posts.template.html'
})
export class AdminPostsComponent {
    private _posts = new Array<IPost>();
    private _selectedPost: IPost | null | undefined = null;
    private _isLoading = true;
    constructor(private readonly _postService: PostService) { }

    onPostClick(id: string) {
        this._selectedPost = this._posts.find(p => p.Id == id);
    }

    onPostDelete(id: string) {
        const confirmation = confirm("Are you sure?");
        if (confirmation) {
            this._postService.deletePost(id)
                .subscribe(res => (res.status == 200) ?
                    console.log("post deleted") :
                    console.log("error"));
            this._posts = this._posts.filter(p => p.Id != id);
            this._selectedPost = null;
        }
    }

    ngOnInit() {
        this._postService.getPosts()
            .subscribe(p => this._posts.push(p),
            _ => _,
            () => this._isLoading = false);
    }
}

