define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/new/new_view');

  return Moonrakr.module('PostsApp.New', function(New){

    New.Controller = {

      newPost: function(){
        var newPost = new Moonrakr.Entities.Post();

        // No need for loading view since we are not make a server request with this prototype now

        // normally we would get a new model from the server with the proper id set

        var view = new New.Post({
          model: newPost
        });

        // DELETE HANDLER //
        view.on('post:delete', function(model){
          Moonrakr.trigger('posts:list');
        });

        // SAVE HANDLER //
        view.on('form:submit', function(data){

          // GET HIGHEST ID OF ALL POSTS -- not needed with live server
          var fetchingPosts = Moonrakr.request('post:entities')
          $.when(fetchingPosts).done(function(posts){

            var highestId = posts.max(function(c){ return c.id });
            highestId = highestId.get('id');
            data.id = highestId + 1
            if(newPost.save(data)){
              Moonrakr.trigger('post:show', newPost.get('id'));
            }
            else {
              view.triggerMethod('form:data:invalid', newPost.validationError);
            }

          }); // when
        }); // view.on

        Moonrakr.secondRegion.show(view);

      }

    }

  });

});