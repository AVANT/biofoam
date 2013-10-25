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

            commentContainerView = new List.Comments({
              collection: comments
            });

            // console.log(commentContainerView);

            // rendering event hanlder
            commentsLayoutView.on('show', function(){

              //*** PROBLEM HERE ***//
              commentsLayoutView.commentsRegion.show( commentContainerView );
              commentsLayoutView.newCommentRegion.show( newCommentView );
            });

            // action event hanlder
            newCommentView.on('comment:submit', function(){
              // get current user info from auth sup app
              console.log( Moonrakr.AuthApp.currentUser );
              console.log( this.model );
              // newComment.save()
            });

            // rendering event hanlder
            that.attachRenderUserHandler( commentContainerView );
          }
          else {
            // TODO handle the case where the comments come back undefined
          }

          // show comments layout in app main region
          Moonrakr.mainRegion.show( commentsLayoutView );

        });
      },

      // OLD VERSION
      // attachRenderUserHandler: function( collectionView ){
      //   collectionView.on('itemview:render:user', function(itemview, userId){
      //     var fetchingUser = Moonrakr.request('user:entity', userId);
      //     $.when(fetchingUser).done(function(user){
      //       var userView;
      //       if (user !== undefined){
      //         userView = new List.User({
      //           model: user
      //         });
      //       }
      //       else{
      //         // TODO handle the case where fetching the user fails
      //       }
      //         itemview.userInformation.show(userView);
      //     });
      //   });
      // },

      // TEST VERSION
      attachRenderUserHandler: function( commentContainerView ){
        commentContainerView.on('render', function(){
          console.log( this.collection );
        });

        // .on('itemview:render:user', function(itemview, userId){

        //   Moonrakr.request('comment:show:return', userId);

        //   var fetchingUser = Moonrakr.request('user:entity', userId);
        //   $.when(fetchingUser).done(function(user){
        //     var userView;
        //     if (user !== undefined){
        //       userView = new List.User({
        //         model: user
        //       });
        //     }
        //     else{
        //       // TODO handle the case where fetching the user fails
        //     }
        //       itemview.userInformation.show(userView);
        //   });



        // });
      }

    }

  });

});