import * as mongoose from 'mongoose';

export type TagDomain = {
    id: string
    name: string
};

export type PostDomain = {
    id: string
    slug: string
    title: string
    heroContent?: string
    content?: string
    coverImage?: string
    createdAt?: Date
    modifiedAt?: Date
    tags?: TagDomain[]
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

export type TagDocument = mongoose.Document & TagDomain;

export type PostDocument = mongoose.Document & PostDomain;

export type ProjectDocument = mongoose.Document & ProjectDomain;

export type ResourceDocument = mongoose.Document & ResourceDomain;

export type SkillDocument = mongoose.Document & SkillDomain;

