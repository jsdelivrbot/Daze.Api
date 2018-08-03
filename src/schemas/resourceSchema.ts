import { mongoose } from '../persistance/connection';

export const ResourceSchema = new mongoose.Schema({
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