
type HALLink = {
    href: string
};

export type HALLinks = {
    Self: HALLink
    Next: HALLink
};

export type HALEmbedded<T> = T | T[];

export type HAL<T> = {
    totalCount: number
    _embedded: HALEmbedded<T>
    _links?: HALLinks
};
