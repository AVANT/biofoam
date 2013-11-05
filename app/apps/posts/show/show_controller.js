define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/show/show_view');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.Controller = {
      showPost: function(id){

        Moonrakr.Common.Controller.helper.cueLoadingView();

        authGranted = Moonrakr.Common.Controller.helper.getAuthFlag( Show.CMSPanel );

        var cmsPanel = authGranted ? new Show.CMSPanel() : null;
        var postLayout = new Show.PostLayout();

        var fetchingPost = Moonrakr.request('post:entity', id);
        $.when(fetchingPost).done(function(post){
          var postView;

          if (post !== undefined){

            postView = new Show.Post({
              model: post
            });

            Moonrakr.execute('header:set:title', 'Posts: ' + post.get('title'));

            // will eventually need to pass a comments/for/:id value with this request
            var commentsView = Moonrakr.request('comments:listforpost');

            postLayout.on('show', function(){
              if(authGranted){postLayout.cmsRegion.show(cmsPanel);}
              postLayout.postRegion.show( postView );
              postLayout.commentsRegion.show( commentsView );
            });

            if(authGranted){
              cmsPanel.on('post:edit', function(){
                Moonrakr.trigger('post:edit', post.get('id'));
              });
            }

          }
          else {
            postView = new Show.MissingPost();
          }

          Moonrakr.mainRegion.show( postLayout );

        });
      }
    };


  });

});