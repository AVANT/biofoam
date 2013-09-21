define(function(require){

  var Moonrakr = require('app');
  var hmm = require('apps/posts/show/show_view');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.Controller = {
      showPost: function(model){
        var postView = new Show.Post({
          model: model
        });
      }
    };

    Moonrakr.secondRegion.show( postView );

  });

});