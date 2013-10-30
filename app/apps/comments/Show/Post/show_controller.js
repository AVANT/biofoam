define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/post/show_view');

  return Moonrakr.module('CommentsApp.Show.Post', function(Post){

    Post.Controller = {

      /*
      *** Show Post Comment ***

      Views: Comment Layout
              - User View

      Models: Comment
              User
      */

      // API CALL
      showCommentReturn: function( model ){
        return this.getCommentView(model);
      },
      getCommentView: function(model){
        var commentLayoutView = new Post.Comment({
          model: model
        });
        this.setHanlders( commentLayoutView );
        return commentLayoutView;
      },
      setHanlders: function( view ){
        // handler for the render user event
        view.on('render:user', function(userId){
          var fetchingUser = Moonrakr.request('user:entity', userId);
          $.when(fetchingUser).done(function(user){
            var userView;
            if (user !== undefined){
              userView = new Post.User({
                model: user
              });
            }
            else{
              console.log('something failed');
              // TODO handle the case where fetching the user fails
            }
              view.userInformation.show(userView);
          });
        });

        // handler for the comment delete event
        view.on('comment:delete', function(){
          this.model.destroy();
          this.close();
        });
      },

      // API CALL
      showComment: function(id){
        this.cueLoading();
        this.fetchComment(id);
        Moonrakr.mainRegion.show( this.commentLayoutView );
      },
      cueLoading: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );
      },
      fetchComment: function(id){
        var that = this;

        var fetchingComment = Moonrakr.request('comment:entity', id);
        return $.when(fetchingComment).done(function(comment){
          if (comment !== undefined){
            that.commentLayoutView = new Post.Comment({
              model: comment
            });
            that.setHanlders( commentLayoutView );
          }
          else {
            that.commentLayoutView = new Post.MissingComment();
          }
        });
      }
    }

  });

});