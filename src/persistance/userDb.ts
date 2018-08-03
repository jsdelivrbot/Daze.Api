import { UserModel } from "../schemas";
import { UserDomain } from "../domain";

export const createUser = async (payload: UserDomain) => {
    return await new UserModel(payload)
        .save();
};

