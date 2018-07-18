import { Resource as ResourceDomain } from '../domain';
import { ResourceModel } from '../schemas';

export const getResources = async (): Promise<ResourceDomain[]> => {
    try {
        return await ResourceModel.find({});
    } catch (err) {
        throw err;
    }
};
