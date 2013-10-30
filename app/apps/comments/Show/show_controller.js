define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/show_view');

  return Moonrakr.module('CommentsApp.Show', function(Show){

    Show.Controller = {

      /*
      *** Show Comment ***

      Views: Comment Layout
              - User View

      Models: Comment
              User
      */

      // FUCKING REFACTOR


      showComment: function(id){

        this.cueLoading();

        // var that = this;

        var fetchingComment = Moonrakr.request('comment:entity', id);

        $.when(fetchingComment).done(function(comment){
          that.handleCommentPromise(comment, that);
        }).then(function(commentLayoutView){
          Moonrakr.mainRegion.show( that.commentLayoutView );
        });

        // FAILURE
        $.when(fetchingComment).fail(function(){
          controller.commentLayoutView = new Show.MissingComment();
          Moonrakr.mainRegion.show( that.commentLayoutView );
        });

      },

      // TODO this is not DRY
      showCommentReturn: function(id){

        var that = this;
        var fetchingComment = Moonrakr.request('comment:entity', id);

        $.when(fetchingComment).done(function(comment){
          that.handleCommentPromise(comment, that);
        })

        $.when(fetchingComment).fail(function(){
          controller.commentLayoutView = new Show.MissingComment();
        });

        // console.log('show comment return', this);
        return this.commentLayoutView;
      },

      cueLoading: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );
      },

      handleCommentPromise: function(comment, controller){
        if (comment !== undefined){
          controller.commentLayoutView = new Show.Comment({
            model: comment
          });
          controller.attachEventHandlers(controller.commentLayoutView);
        }
        else {
          controller.commentLayoutView = new Show.MissingComment();
        }
      },

      attachEventHandlers: function(commentLayoutView){
        // handler for the render:user event
        commentLayoutView.on('render:user', function(userId){
          var fetchingUser = Moonrakr.request('user:entity', userId);
          $.when(fetchingUser).done(function(user){
            var userView;
            if (user !== undefined){
              userView = new Show.User({
                model: user
              });
            }
            else{
              console.log('something failed');
              // TODO handle the case where fetching the user fails
            }
              commentLayoutView.userInformation.show(userView);
          });
        });

        commentLayoutView.on('comment:delete', function(){
          this.model.destroy();
          this.close();
        });
      }
    }

  });

});