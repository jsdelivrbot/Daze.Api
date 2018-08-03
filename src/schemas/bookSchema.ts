import { mongoose } from '../persistance/connection';

export const BookSchema = new mongoose.Schema({
    image: {
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
    readAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    authors: {
        type: Array,
        required: false,
        default: []
    }
});