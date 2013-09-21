define(function(require){

  var Moonrakr = require('app');
  var Show = require('apps/posts/show/show_view');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.Controller = {
      showPost: function(id){
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
      } // showPost
    };


  });

});