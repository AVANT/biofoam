require('app');
require('apps/comments/list/forpost/list_views');

return Moonrakr.module('Comments.List.ForPost', function(ForPost){

  ForPost.Controller = {

    // TODO write out some comments here about how this works

    // API call
    listComments: function(){
      this.initViewsModels();
      this.fetchComments()
      return this.commentsLayout;
    },
    initViewsModels: function(){
      this.commentsLayout = new ForPost.CommentsLayout();
      this.newComment = new ForPost.NewComment({
        model: new Moonrakr.Entities.Comment()
      });
    },
    fetchComments: function(){
      var self = this;
      var fetchingComments = Moonrakr.request('comment:entities');
      $.when(fetchingComments).done(function(comments){

        if (comments !== undefined ){

          self.commentContainer = new ForPost.Comments({
            collection: comments
          });

          self.commentsLayout.on('show', function(){
            self.commentsLayout.newCommentRegion.show( self.newComment );
            self.commentsLayout.commentsRegion.show( self.commentContainer );
          });

          self.newComment.on('comment:submit', function(){
            var data = {
              userId: Moonrakr.AuthApp.currentUser.get('id'), // get current user info from auth app
              // need to pull in current post id too
              id: Moonrakr.Entities.HelperFunctions.randomString(32) // not needed with live server
            };
            this.model.save(data);
          });

        }
        else {
          console.log('failed to get collection of comments for post');
          // TODO handle the case where the comments collection back undefined
        }
      });
    }


  }

});