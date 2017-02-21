namespace Daze.Interfaces {

    export interface IPost {
        Id: string;
        Title: string;
        Content: string;
        CreatedAt: Date;
        ModifiedAt: Date;
        tags: Array<ITag>;
    }
}