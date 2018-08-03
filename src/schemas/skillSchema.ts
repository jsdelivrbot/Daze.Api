import { mongoose } from '../persistance/connection';

export const SkillSchema = new mongoose.Schema({
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
