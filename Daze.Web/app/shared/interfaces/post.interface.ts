namespace Daze.Interfaces {

    export interface IPost {
        Id: string;
        Title: string;
        Slug: string;
        Content: string;
        CreatedAt: Date;
        ModifiedAt: Date;
        tags: Array<ITag>;
    }
}