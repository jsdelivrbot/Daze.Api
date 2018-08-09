import { ValidationSchema } from "express-validator";

export const registrationSchema: ValidationSchema = {
    'email': {
        notEmpty: true,
        isEmail: {
            errorMessage: 'Invalid email'
        }
    },
    'password': {
        notEmpty: true,
        isLength: {
            options: [{ min: 12 }],
            errorMessage: 'Password must be at least 12 characters.'
        },
        errorMessage: 'Invalid password'
    }
};



