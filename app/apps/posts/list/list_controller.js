define(function(require){
  var Moonrakr = require("app");
  var hmm = require("apps/posts/list/list_view");

  return Moonrakr.module("PostsApp.List", function(List){
    List.Controller = {
      listPosts: function(){

        //// get posts collection
        var posts = Moonrakr.request("post:entities");

        console.log(posts);

        //// create a view for the collection
        var postsListView = new List.Posts({
          collection: posts
        });

        //// show this view
        Moonrakr.secondRegion.show( postsListView );
      }
    }
  })
})