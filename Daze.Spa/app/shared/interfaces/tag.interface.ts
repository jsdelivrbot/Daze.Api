namespace Daze.Interfaces {

    export interface ITag {
        Id: string;
        TagName: string;
        Posts: Array<IPost>;
    }
}