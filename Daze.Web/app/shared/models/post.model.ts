import IPost = Daze.Interfaces.IPost;
import ITag = Daze.Interfaces.ITag;

export class Post implements IPost {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    modifiedAt: Date;
    tags: Array<ITag>;
}