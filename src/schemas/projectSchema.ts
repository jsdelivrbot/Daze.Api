import { mongoose } from '../persistance/connection';

export const ProjectSchema = new mongoose.Schema({
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
