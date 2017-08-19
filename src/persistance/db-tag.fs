namespace Db

[<RequireQualifiedAccess>]
module Tag =

    open System
    open Domain
    open BaseDb
    open Mappings

    let getAllTags () =
        query {
            for t in ctx.Public.Tag do
            select { Id = t.Id
                     TagName = t.TagName }

        } |> Seq.cache

    let getAllTagsPaginated page pageSize =
        let startIndex = (page - 1) * pageSize
        query {
            for t in ctx.Public.Tag do
            skip startIndex
            take pageSize
            select { Id = t.Id
                     TagName = t.TagName }
        } |> Seq.cache

    let findTagById (id: int64) =
        let tag = query {
            for t in ctx.Public.Tag do
            where (t.Id = id)
            exactlyOneOrDefault
        }
        if (isNull tag) then None
        else Some { Id = tag.Id
                    TagName = tag.TagName }


    let existsTag (id: int64) =
        query {
            for t in ctx.Public.Tag do
            exists (t.Id = id)
        }


    let asyncInsertNewTag (tag: Tag) =
        async {
            let newTag = ctx.Public.Tag.Create()
            newTag.TagName <- tag.TagName

            try
                do! ctx.SubmitUpdatesAsync()
            with _ ->
                ctx.GetUpdates()
                ctx.ClearUpdates()
        }

    let asyncFullyUpdateTag (tag: Tag) =
        async {
            let foundTag = query {
                for p in ctx.Public.Tag do
                where (p.Id = tag.Id)
                exactlyOneOrDefault
            }
            if not (isNull foundTag) then
                foundTag.TagName <- tag.TagName

            do! ctx.SubmitUpdatesAsync()
        }

    let asyncPartiallyUpdateTag (tag: Tag) =
        async {
            let foundTag = query {
                for p in ctx.Public.Tag do
                where (p.Id = tag.Id)
                exactlyOneOrDefault
            }
            if not (isNull foundTag) then

                if tag.TagName.IsSome then
                    foundTag.TagName <- tag.TagName

            do! ctx.SubmitUpdatesAsync()
        }

    let removeTag (id: int64) =
        async {
            let record = ctx.Public.Tag.Create()
            record.Id <- id
            record.Delete()
            do! ctx.SubmitUpdatesAsync()
        } |> Async.RunSynchronously



