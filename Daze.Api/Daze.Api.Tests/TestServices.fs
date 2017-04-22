module TestServices 

open Xunit
open Daze.Api

[<Fact>]
let ``getAllPosts returns a list of posts`` () = 
    let posts = PostService.getAllPosts()
    Assert.NotEmpty(posts)


