namespace Daze.Interfaces {

    export interface IPost {
        ID: string;
        Title: string;
        Content: string;
        CreatedAt: Date;
        ModifiedAt: Date;
        Tags: Array<ITag>;
    }
}