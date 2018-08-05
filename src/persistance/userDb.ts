import { UserModel } from "../schemas";
import { UserDomain, UserDocument } from "../domain";

type TokenResponse = {
    createdUser: UserDocument
    token: string
};

export const createUser = async (payload: UserDomain): Promise<TokenResponse> => {
    const createdUser = await new UserModel(payload).save();
    const token = await createdUser.generateAuthToken();
    return { createdUser, token };
};

