namespace Daze.Interfaces {

    export interface IPost {
        Id: number;
        Title: string;
        Content: string;
        CreatedAt: Date;
        ModifiedAt: Date;
        tags: Array<ITag>;
    }
}