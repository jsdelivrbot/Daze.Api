import IPost = Daze.Interfaces.IPost;
import ITag = Daze.Interfaces.ITag;

export class Post implements IPost {
    Id: number;
    Title: string;
    Content: string;
    CreatedAt: Date;
    ModifiedAt: Date;
    tags: Array<ITag>;
}