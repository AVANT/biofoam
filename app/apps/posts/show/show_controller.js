define(function(require){

  var Moonrakr = require('app'),
      Show = require('apps/posts/show/show_view');

  require('apps/_common/views');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.Controller = {
      showPost: function(id){
        var loadingView = new Moonrakr.Common.Views.Loading({
          title: 'Artificial Loading Delay',
          message: 'Data loading is delayed to demonstrate how connectivity lag is handled.'
        });
        Moonrakr.secondRegion.show( loadingView );

        var fetchingPost = Moonrakr.request('post:entity', id);
        $.when(fetchingPost).done(function(post){
          var postView;

          if (post !== undefined){
            postView = new Show.Post({
              model: post
            });
          }
          else {
            postView = new Show.MissingPost();
          }

          Moonrakr.secondRegion.show( postView );

          });
      }
    };


  });

});