define(function(require){

  // APPS
  var Moonrakr = require('app');
  require('apps/posts/list/list_views');

  return Moonrakr.module('PostsApp.List', function(List){
    List.Controller = {
      // api calls
      listPosts: function(){

        Moonrakr.Common.Controller.helper.cueLoadingView();

        var authGranted = Moonrakr.Common.Controller.helper.getAuthFlag( List.CMSPanel );

        var fetchingPosts = Moonrakr.request('post:entities');

        var postsListLayout = new List.Layout();
        var postsListPanel = authGranted ? new List.CMSPanel() : null;

        $.when(fetchingPosts).done(function(posts){

          var postsListView = new List.Posts({
            collection: posts
          });

          postsListLayout.on('show', function(){
            if(authGranted){ postsListLayout.panelRegion.show( postsListPanel ); }
            postsListLayout.postsRegion.show( postsListView );
          });

          postsListView.on('itemview:post:show', function(childView, model){
            Moonrakr.trigger('post:show', model.get('id'));
          });

          if(authGranted){
            postsListPanel.on('post:new', function(){
              Moonrakr.trigger('post:new');
            });
          }

          Moonrakr.mainRegion.show( postsListLayout );

        }); // when...done

      } // listPosts
    }; // List.Controller
  }); // return sub-module
}); // define require