
import { IPost } from './post.interface';

export interface ITag {
    ID: string;
    Name: string;
    Posts: Array<IPost>;
}
namespace Daze.Interfaces {

}