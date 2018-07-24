import { BookDomain } from '../domain';
import { BookModel } from '../schemas';

export const getBooks = async (): Promise<BookDomain[]> => {
    return await BookModel
        .find({})
        .sort({ readAt: 'desc' });
};

export const createBook = async (payload: BookDomain): Promise<BookDomain> => {
    return await new BookModel(payload)
        .save();
};
