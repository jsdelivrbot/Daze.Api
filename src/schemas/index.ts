import { mongoose } from '../persistance/connection';
import { SkillDocument, PostDocument, ProjectDocument, ResourceDocument } from '../domain';

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

const PostSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    heroContent: {
        type: String,
        required: false,
        trim: true,
        minlength: 1
    },
    content: {
        type: String,
        required: false,
        trim: true,
        minlength: 1
    },
    coverImage: {
        type: String,
        required: false,
        trim: true,
        minlength: 1
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

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    url: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    publishedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    link: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true
    }
});

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    level: {
        type: Number,
        required: true,
        min: 0
    }
});

const PostModel = mongoose.model<PostDocument>('Post', PostSchema);
const ProjectModel = mongoose.model<ProjectDocument>('Project', ProjectSchema);
const ResourceModel = mongoose.model<ResourceDocument>('Resource', ResourceSchema);
const SkillModel = mongoose.model<SkillDocument>('Skill', SkillSchema);

export {
    PostModel,
    ProjectModel,
    ResourceModel,
    SkillModel
};

