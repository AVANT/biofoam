define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/list/list_view');

  return Moonrakr.module('CommentsApp.List', function(List){

    List.Controller = {

      /*
      *** List Comments ***

      Views: Comments Layout
             - New Comment
             - Comment Collection
               - Comment
                  - User View

      Models: New Comment
              Comment
              User

      Collection: Comments
      */

      listComments: function(){

        this.cueLoading();

        this.initViewsModels();

        this.fetchComments( this.commentsLayoutView, this.newCommentView );

      },

      cueLoading: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );
      },

      initViewsModels: function(){
        // init comments layout
        this.commentsLayoutView = new List.CommentsLayout();

        // init new comment and new comment view
        this.newComment = new Moonrakr.Entities.Comment();
        this.newCommentView = new List.NewComment({
          model: this.newComment
        });
      },

      fetchComments: function( commentsLayoutView, newCommentView ){
        var that = this;
        var fetchingComments = Moonrakr.request('comment:entities');
        $.when(fetchingComments).done(function(comments){

          var commentCollectionView;

          if (comments !== undefined){

            commentCollectionView = new List.Comments({
              collection: comments
            });

            // event hanlder
            commentsLayoutView.on('show', function(){
              commentsLayoutView.commentsRegion.show( commentCollectionView );
              commentsLayoutView.newCommentRegion.show( newCommentView );
            });

            // event hanlder
            newCommentView.on('comment:submit', function(){
              console.log( 'save the new comment' );
              // get current user info
            });

            // event hanlder
            that.attachRenderUserHandler( commentCollectionView );
          }
          else {
            // handle the case where the comments come back undefined
          }

          // show comments layout in app main region
          Moonrakr.mainRegion.show( commentsLayoutView );

        });
      },

      attachRenderUserHandler: function( collectionView ){
        collectionView.on('itemview:render:user', function(itemview, userId){
          var fetchingUser = Moonrakr.request('user:entity', userId);
          $.when(fetchingUser).done(function(user){
            var userView;
            if (user !== undefined){
              userView = new List.User({
                model: user
              });
            }
            else{
              // handle the case where fetching the user fails
            }
              itemview.userInformation.show(userView);
          }); // when
        });
      }
    }

  });

});