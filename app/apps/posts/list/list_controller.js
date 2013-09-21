define(function(require){
  var Moonrakr = require('app');
  var hmm = require('apps/posts/list/list_view');

  return Moonrakr.module('PostsApp.List', function(List){
    List.Controller = {
      listPosts: function(){

        //// get posts collection
        var posts = Moonrakr.request('post:entities');

        //// create a view for the collection
        var postsListView = new List.Posts({
          collection: posts
        });

        postsListView.on('itemview:post:show', function(childView, model){
          // console.log('received itemview:post:show event on model ', model);
          Moonrakr.PostsApp.Show.Controller.showPost(model);
        });

        //// show this view
        Moonrakr.secondRegion.show( postsListView );
      }
    };
  });
});