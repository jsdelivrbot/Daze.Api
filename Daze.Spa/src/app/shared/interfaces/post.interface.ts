namespace Daze.Interfaces {

    export interface IPost {
        Id: string;
        Title: string;
        Slug: string;
        HeroContent: string;
        Content: string;
        CreatedAt: Date;
        ModifiedAt: Date;
        Tags: Array<ITag>;
    }
}