namespace Daze.Interfaces {

    export interface ITag {
        Id: string;
        Name: string;
        Posts: Array<IPost>;
    }
}