define(function(require){

  var Moonrakr = require('app');
  var Show = require('apps/posts/show/show_view');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.Controller = {
      showPost: function(id){
        var model = Moonrakr.request('post:entity', id);
        var postView;

        // check for the model doesnt exist error
        if (model !== undefined){
          postView = new Show.Post({
            model: model
          });
        }
        else {
          postView = new Show.MissingPost();
        }

        Moonrakr.secondRegion.show( postView );
      }
    };


  });

});