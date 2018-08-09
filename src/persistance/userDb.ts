import { UserModel } from '../schemas';
import { UserDomain, UserDocument } from '../domain';
import * as bcrypt from 'bcrypt';

type TokenResponse = {
    user: UserDocument
    token: string
};

export const createUser = async (user: UserDomain): Promise<TokenResponse> => {
    const createdUser = await new UserModel(user).save();
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

    const areEqual = await bcrypt.compare(password, foundUser.password);
    const token = await foundUser.generateAuthToken();

    return areEqual ? {
        user: foundUser,
        token: token
    } : null;
};

export const removeTokenFromUser = async (token: string): Promise<void> => {
    const foundUser = await UserModel.findOne({
        'tokens.token': token
    });

    return await foundUser.removeToken(token);
};

