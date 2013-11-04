define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/foruser/show_view');

  return Moonrakr.module('Comments.Show.ForUser', function(ForUser){

    ForUser.Controller = {

      // API call
      showComment: function(model){
        return this.getCommentView(model);
      },
      getCommentView: function(model){
        var commentLayoutView = new ForUser.Comment({
          model: model
        });
        this.setHandlers( commentLayoutView );
        return commentLayoutView;
      },
      setHandlers: function(view){
        // hanlder for the render post event
        view.on('render:post', function(postId){
          var fetchingPost = Moonrakr.request('post:entity', postId);
          $.when(fetchingPost).done(function(post){
            var postView;
            if (post !== undefined){
              postView = new ForUser.Post({
                model: post
              });
            }
            else {
              console.log('something failed while fetching the post');
              // TODO handle the case where this fails
            }
            view.addContext.show( postView );
          });
        });

        // handler for the comment delete event
        view.on('comment:delete',  function(){
          this.model.destroy();
          this.close();
        });
      }

    }

  });

});