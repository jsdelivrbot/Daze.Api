
type HALLink = {
    href: string
};

export type HALLinks = {
    self: HALLink
    next: HALLink
};

export type HALEmbedded<T> = T | T[];

export type HAL<T> = {
    totalCount: number
    _embedded: HALEmbedded<T>
    _links?: HALLinks
};

export const createHAL = <T>(collection: T | T[], links?: HALLinks): HAL<T> => ({
    totalCount: (<T[]>collection).length !== undefined ? (<T[]>collection).length : 1,
    _links: links,
    _embedded: collection
});

