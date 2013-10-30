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
        this.commentsLayoutView = new List.CommentsLayout();
        this.newCommentView = Moonrakr.request('comment:new:return');
      },

      fetchComments: function( commentsLayoutView, newCommentView ){
        var that = this;
        var fetchingComments = Moonrakr.request('comment:entities');
        $.when(fetchingComments).done(function(comments){

          var commentCollectionView;

          if (comments !== undefined){

            commentContainerView = new List.Comments({
              collection: comments
            });

            // rendering event hanlder
            commentsLayoutView.on('show', function(){
              commentsLayoutView.commentsRegion.show( commentContainerView );
              commentsLayoutView.newCommentRegion.show( newCommentView );
            });

            // action event hanlder
            newCommentView.on('comment:submit', function(){
              var data = {
                userId: Moonrakr.AuthApp.currentUser.get('id'), // get current user info from auth sup app
                id: Moonrakr.Entities.HelperFunctions.randomString(32) // not needed with live server
              };
              this.model.save(data);
            });

          }
          else {
            // TODO handle the case where the comments collection comes back undefined
          }

          // show comments layout in app main region
          Moonrakr.mainRegion.show( commentsLayoutView );

        });
      }
    }
  });

});