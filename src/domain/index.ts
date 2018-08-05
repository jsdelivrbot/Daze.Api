import * as mongoose from 'mongoose';

export type PostDomain = {
    id: string
    slug: string
    title: string
    heroContent?: string
    content?: string
    coverImage?: string
    createdAt?: Date
    modifiedAt?: Date
    tags: [{
        id: string
        name: string
    }]
};

export type ProjectDomain = {
    id: string
    name: string
    description: string
    url: string
    publishedAt: Date
};

export type ResourceDomain = {
    id: string
    category: string
    name: string
    link: string
    description: string
};

export type SkillDomain = {
    id: string
    name: string
    level: number
};

export type BookDomain = {
    image: string
    title: string
    readAt: Date
    authors: string[]
};


export type UserDomain = {
    email: string
    password: string
    tokens: [{
        access: string
        token: string
    }]
};


export type PostDocument = mongoose.Document & PostDomain;

export type ProjectDocument = mongoose.Document & ProjectDomain;

export type ResourceDocument = mongoose.Document & ResourceDomain;

export type SkillDocument = mongoose.Document & SkillDomain;

export type BookDocument = mongoose.Document & BookDomain;

export type UserDocument = mongoose.Document & UserDomain & {
    generateAuthToken: () => Promise<string>
};

