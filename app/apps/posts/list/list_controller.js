define(function(require){

  // APPS
  var Moonrakr = require('app');
  require('apps/posts/list/list_view');

  return Moonrakr.module('PostsApp.List', function(List){
    List.Controller = {
      listPosts: function(){

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var fetchingPosts = Moonrakr.request('post:entities');

        var postsListLayout = new List.Layout();
        var postsListPanel = new List.Panel();

        $.when(fetchingPosts).done(function(posts){

          var postsListView = new List.Posts({
            collection: posts
          });

          postsListLayout.on('show', function(){
            postsListLayout.panelRegion.show( postsListPanel );
            postsListLayout.postsRegion.show( postsListView );
          });

          postsListView.on('itemview:post:show', function(childView, model){
            Moonrakr.trigger('post:show', model.get('_id'));
          });

          postsListPanel.on('post:new', function(){
            Moonrakr.trigger('post:new');
          });

          Moonrakr.mainRegion.show( postsListLayout );

        }); // when...done

      } // listPosts
    }; // List.Controller
  }); // return sub-module
}); // define require