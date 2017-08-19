namespace Types

type JsonResponse<'T> = {
    Results: seq<'T>
}