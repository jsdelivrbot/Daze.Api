import { UserModel } from '../schemas';
import { UserDomain, UserDocument } from '../domain';
import * as bcrypt from 'bcryptjs';

type TokenResponse = {
    user: UserDocument
    token: string
};

export const createUser = async (payload: UserDomain): Promise<TokenResponse> => {
    const createdUser = await new UserModel(payload).save();
    const token = await createdUser.generateAuthToken();

    return {
        user: createdUser,
        token: token
    };
};

export const findAuthenticatedUser = async (token: string): Promise<UserDomain> => {
    return await (UserModel as any).findByToken(token);
};

export const findUser = async (email: string, password: string): Promise<TokenResponse> => {
    const foundUser = await UserModel.findOne({ email });
    const authToken = foundUser.tokens.find(token => token.access === 'auth');
    const areEqual = await bcrypt.compare(password, foundUser.password);
    const token = await foundUser.generateAuthToken();

    return areEqual ? {
        user: foundUser,
        token: token
    } : null;
};



