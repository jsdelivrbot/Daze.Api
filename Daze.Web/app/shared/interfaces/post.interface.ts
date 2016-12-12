
    import { ITag } from './tag.interface';

    export interface IPost {
        ID: string;
        Title: string;
        Content: string;
        CreatedAt: Date;
        ModifiedAt: Date;
        Tags: Array<ITag>;
    }
namespace Daze.Interfaces {
}