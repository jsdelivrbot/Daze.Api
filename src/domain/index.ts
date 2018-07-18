import * as mongoose from 'mongoose';

export type Tag = {
    id: string
    name: string
};

export type Post = mongoose.Document & {
    id: string
    slug: string
    title: string
    heroContent: string | undefined
    content: string | undefined
    coverImage: string | undefined
    createdAt: Date | undefined
    modifiedAt: Date | undefined
    tags: Tag[]
};
// Comments: seq<Comment>

export type Project = mongoose.Document & {
    id: string
    name: string
    description: string | undefined
    url: string | undefined
    published_year: number | undefined
};

export type Resource = mongoose.Document & {
    id: string
    category: string
    name: string
    link: string
    description: string
};

export type Skill = mongoose.Document & {
    id: string
    name: string
    level: number
};


