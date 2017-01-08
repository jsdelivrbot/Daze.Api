namespace Daze.Interfaces {

    export interface IPost {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        modifiedAt: Date;
        tags: Array<ITag>;
    }
}