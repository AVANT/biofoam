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

      // refactor?

      showComment: function(id){

        this.cueLoading();
        this.getComment(id);

        Moonrakr.mainRegion.show( this.commentLayoutView );

      },
      showCommentReturn: function(id){

        this.cueLoading();
        this.getComment(id);

        console.log(this.commentLayoutView);
        return this.commentLayoutView;

      },
      getComment: function(id){
        var that = this;

        var fetchingComment = Moonrakr.request('comment:entity', id);
        return $.when(fetchingComment).done(function(comment){
          if (comment !== undefined){
            that.commentLayoutView = new Post.Comment({
              model: comment
            });

            // handler for the render user event
            that.commentLayoutView.on('render:user', function(userId){
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
                  that.commentLayoutView.userInformation.show(userView);
              });
            });

            // handler for the comment delete event
            that.commentLayoutView.on('comment:delete', function(){
              this.model.destroy();
              this.close();
            });

            return that.commentLayoutView

          }
          else {
            that.commentLayoutView = new Post.MissingComment();
          }
        });
      },
      cueLoading: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );
      }
    }

  });

});