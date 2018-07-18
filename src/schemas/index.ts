import conn from '../persistance/connection';
import { Skill, Post, Project, Resource } from '../domain';

const TagSchema = new conn.Schema({
    name: {
        type: String,
        required: true
    }
});

const PostSchema = new conn.Schema({
    slug: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    heroContent: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    coverImage: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    tags: [TagSchema]
});

const ProjectSchema = new conn.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    publishedAt: {
        type: Date,
        required: false,
        default: Date.now
    }
});

const ResourceSchema = new conn.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const SkillSchema = new conn.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

const PostModel = conn.model<Post>('Post', PostSchema);
const ProjectModel = conn.model<Project>('Project', ProjectSchema);
const ResourceModel = conn.model<Resource>('Resource', ResourceSchema);
const SkillModel = conn.model<Skill>('Skill', SkillSchema);

export {
    PostModel,
    ProjectModel,
    ResourceModel,
    SkillModel
};

