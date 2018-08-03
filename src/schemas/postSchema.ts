import { mongoose } from '../persistance/connection';

export const PostSchema = new mongoose.Schema({
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
    tags: [{
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        }
    }]
});
