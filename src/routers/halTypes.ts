
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

export const createHAL = <T>(collection: T[], links?: HALLinks): HAL<T> => ({
    totalCount: collection.length,
    _links: links,
    _embedded: collection
});
