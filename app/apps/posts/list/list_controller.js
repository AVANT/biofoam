define(function(require){
  var Moonrakr = require('app');
  require('apps/posts/list/list_view');
  require('apps/_common/views');

  return Moonrakr.module('PostsApp.List', function(List){
    List.Controller = {
      listPosts: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.secondRegion.show( loadingView );

        var fetchingPosts = Moonrakr.request('post:entities');

        $.when(fetchingPosts).done(function(posts){
          var postsListView = new List.Posts({
            collection: posts
          });

          postsListView.on('itemview:post:show', function(childView, model){
            Moonrakr.PostsApp.trigger('post:show', model.get('id'));
          });

          Moonrakr.secondRegion.show( postsListView );
        }); // when...done

      } // listPosts
    }; // List.Controller
  }); // return sub-module
}); // define require