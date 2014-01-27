require('app');
require('apps/posts/list/views/posts');
require('apps/posts/list/views/post');
require('apps/posts/list/views/layout');
require('apps/posts/list/views/cms_panel');

return Moonrakr.module('Posts.List', function(List){
  List.Controller = {
    // api calls
    listPosts: function(){

      // set loading class on body
      Moonrakr.execute('add:body:class', 'loading');
      Moonrakr.Common.Controller.helper.cueLoadingView();

      // refactor so this controller doesnt crash when this method fails
      // refactor to bring logic into this controller ?
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

        Moonrakr.execute('remove:body:class', 'loading');
        Moonrakr.mainRegion.show( postsListLayout );
        Moonrakr.execute('add:body:class', 'posts');

      }); // when...done

    } // listPosts
  }; // List.Controller
}); // return sub-module