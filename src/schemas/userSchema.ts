import { mongoose } from '../persistance/connection';
import { isEmail } from 'validator';
import { UserDocument } from '../domain';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            msg: '{VALUE} is not a valid email',
            validator: isEmail
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', async function (next) {
    const user = this as any;

    if (!user.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    next();
});

UserSchema.methods.toJSON = function () {
    const user = this as UserDocument;
    const { _id, email } = user.toObject();
    return { _id, email };
};

UserSchema.methods.generateAuthToken = async function () {
    const user = this as UserDocument;
    const access = 'auth';
    const secret = 'abc123';

    const token = jwt.sign({
        _id: user._id.toHexString(),
        access: access
    }, secret);

    (user.tokens as any) = user.tokens.concat({
        access: access,
        token: token
    });

    await user.save();
    return token;
};

UserSchema.methods.removeToken = async function (token: string) {
    const user = this as UserDocument;

    return await user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

UserSchema.statics.findByToken = async function (token: string) {
    const User = this;
    const secret = 'abc123';
    let decoded: any;

    try {
        decoded = jwt.verify(token, secret);
    } catch {
        return Promise.reject();
    }

    return await User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function () {
};

export { UserSchema };
