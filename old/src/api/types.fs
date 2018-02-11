namespace Api.Types

type HALLink = {
    href: string }

type HALLinks = {
    Self: HALLink
    Next: HALLink }

type HALEmbedded<'T> =
| Item of 'T
| Items of seq<'T>

type HAL<'T> = {
    _links: HALLinks
    totalCount: int
    _embedded:  HALEmbedded<'T> }


(*
    application/hal+json; profile=schemaname
    {
        "_links": {
            "self": {
                "href": "/games" // relative or absolute
            },
            "next": {
                "href": "/games?page=2"
            },
            "find": {
                "href"; "/games{?query}",
                "templated": true
            }
        },
        "totalCount": 100,
        "_embedded": {
            "games": [
                {
                    "_links": {
                        "self": {
                            "href": "/games/123"
                        }
                    },
                    "price": 30.00,
                    "currency": "USD",
                    "name": "Halo 3"
                }
            ]
        }
    }
*)
