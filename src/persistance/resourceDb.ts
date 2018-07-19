import { ResourceDomain } from '../domain';
import { ResourceModel } from '../schemas';

export const getResources = async (): Promise<ResourceDomain[]> => {
    return await ResourceModel
        .find({});
};
