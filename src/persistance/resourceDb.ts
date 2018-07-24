import { ResourceDomain } from '../domain';
import { ResourceModel } from '../schemas';

export const getResources = async (): Promise<ResourceDomain[]> => {
    return await ResourceModel
        .find({});
};

export const createResource = async (payload: ResourceDomain): Promise<ResourceDomain> => {
    return await new ResourceModel(payload)
        .save();
};
