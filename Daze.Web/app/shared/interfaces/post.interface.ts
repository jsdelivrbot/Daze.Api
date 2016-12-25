namespace Daze.Interfaces {

    export interface IPost {
        id: number;
        title: string;
        content: string;
        createdAt: Date;
        modifiedAt: Date;
        tags: Array<ITag>;
    }
}