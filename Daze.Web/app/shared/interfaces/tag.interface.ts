namespace Daze.Interfaces {

    export interface ITag {
        ID: string;
        Name: string;
        Posts: Array<IPost>;
    }
}