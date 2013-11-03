define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/show/show_view');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.Controller = {
      showPost: function(id){
        var loadingView = new Moonrakr.Common.Views.Loading({
          title: 'Artificial Loading Delay',
          message: 'Data loading is delayed to demonstrate how connectivity lag is handled.'
        });
        Moonrakr.mainRegion.show( loadingView );

        var postLayout = new Show.PostLayout();

        var fetchingPost = Moonrakr.request('post:entity', id);
        $.when(fetchingPost).done(function(post){
          var postView;

          if (post !== undefined){

            postView = new Show.Post({
              model: post
            });

            // will eventually need to pass a comments/for/:id value with this request
            var commentsView = Moonrakr.request('comments:listforpost');

            postView.on('post:edit', function(post){
              Moonrakr.trigger('post:edit', post.get('id'));
            });

            postLayout.on('show', function(){
              postLayout.postRegion.show( postView );
              postLayout.commentsRegion.show( commentsView );
            });
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