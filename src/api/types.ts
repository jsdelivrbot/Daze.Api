
export type HALLink = {
    href: string
}

export type HALLinks = {
    Self: HALLink
    Next: HALLink
}

export type HALEmbedded<T> = T | T[]

export type HAL<T> = {
    totalCount: number
    _links: HALLinks
    _embedded: HALEmbedded<T>
}
