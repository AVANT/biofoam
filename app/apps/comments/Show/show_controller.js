define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/show_view');

  return Moonrakr.module('CommentsApp.Show', function(Show){

    Show.Controller = {
      showComment: function(id){
        var that = this;

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var fetchingComment = Moonrakr.request('comment:entity', id);

        $.when(fetchingComment).done(function(comment){
          that.handleCommentPromise(comment, that);

        // SUCCESS
        }).then(function(commentLayoutView){
          Moonrakr.mainRegion.show( that.commentLayoutView );
        });

        // FAILURE
        $.when(fetchingComment).fail(function(){
          controller.commentLayoutView = new Show.MissingComment();
          Moonrakr.mainRegion.show( that.commentLayoutView );
        });

      }, // showComment

      handleCommentPromise: function(comment, controller){
        if (comment !== undefined){
          controller.commentLayoutView = new Show.Comment({
            model: comment
          });
          console.log( controller );
          controller.attachEventHandlers(controller);
        }
        else {
          controller.commentLayoutView = new Show.MissingComment();
        }
      },

      attachEventHandlers: function(controller){

        // handler for the render:user event
        controller.commentLayoutView.on('render:user', function(userId){
          var fetchingUser = Moonrakr.request('user:entity', userId);
          $.when(fetchingUser).done(function(user){
            var userView;
            if (user !== undefined){
              userView = new Show.User({
                model: user
              });
            }
            else{
              // handle the case where fetching the user fails
            }
              controller.commentLayoutView.userInformation.show(userView);
          }); // when
        }); // render:user

      }
    } // Show.Controller

  });

});