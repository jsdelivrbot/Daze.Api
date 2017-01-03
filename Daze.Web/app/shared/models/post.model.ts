import IPost = Daze.Interfaces.IPost;
import ITag = Daze.Interfaces.ITag;

export class Post implements IPost {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    modifiedAt: Date;
    tags: Array<ITag>;
}