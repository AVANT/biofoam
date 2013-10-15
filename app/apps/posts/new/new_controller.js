define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/new/new_view');

  return Moonrakr.module('PostsApp.New', function(New){

    New.Controller = {

      newPost: function(){
        // GET POST MODEL FROM THIS APP OR CREATE A NEW ONE
        console.log( Moonrakr.PostsApp.New.newPost )
        var newPost = Moonrakr.PostsApp.New.newPost || new Moonrakr.Entities.Post();

        var view = new New.Post({
          model: newPost
        });

        // LOCAL SAVE HANLDER //
        view.on('input:changed', function(){
          console.log('local save triggered on controller');
          Moonrakr.PostsApp.New.newPost = newPost;
        });

        view.on('redactor:content', function(data){
          console.log('redactor save triggered on controller');
          newPost.set( data );
          console.log( newPost.get( 'body' ) );
          Moonrakr.PostsApp.New.newPost = newPost;
        });

        // DELETE HANDLER //
        view.on('post:delete', function(model){
          Moonrakr.trigger('posts:list');
        });

        // SAVE HANDLER //
        view.on('form:submit', function(data){

          // GET HIGHEST ID OF ALL POSTS -- not needed with live server
          var fetchingPosts = Moonrakr.request('post:entities');
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

        Moonrakr.mainRegion.show(view);

      }

    }

  });

});