namespace Persistance.Db

module Mappings =

    open Domain
    open BaseDb

    let mapPost (post: PostEntity) =
        { Id = post.Id
          Slug = post.Slug
          Title = post.Title
          HeroContent = post.HeroContent
          Content = post.Content
          CoverImage = post.CoverImage
          CreatedAt = post.CreatedAt
          ModifiedAt = post.ModifiedAt
          Tags = Seq.empty }

    let mapTag (tag: TagEntity) =
        { Id = tag.Id
          TagName = tag.TagName }

    let mapProject (project: ProjectEntity) =
        { Id = project.Id
          ProjectName = project.Name
          Description = project.Description
          Url = project.Url
          PublishedYear = project.PublishedYear }

    let mapSkill (skill: SkillEntity) =
        { Id = skill.Id
          SkillName = skill.Name
          FocusArea = skill.FocusArea
          Level = skill.Level }



