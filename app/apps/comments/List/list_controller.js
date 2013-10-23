define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/list/list_view');

  return Moonrakr.module('CommentsApp.List', function(List){

    List.Controller = {
      listComments: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var fetchingComments = Moonrakr.request('comment:entities');

        var commentsLayoutView = new List.CommentsLayout();


        var newComment = new Moonrakr.Entities.Comment();
        var newCommentView = new List.NewComment({
          model: newComment
        });

        $.when(fetchingComments).done(function(comments){

          var commentCollectionView;

          // console.log( comments );
          if (comments !== undefined){

            commentCollectionView = new List.Comments({
              collection: comments
            });

            commentsLayoutView.on('show', function(){
              commentsLayoutView.commentsRegion.show( commentCollectionView );
              commentsLayoutView.newCommentRegion.show( newCommentView );
            });

            newCommentView.on('comment:submit', function(){
              console.log( 'save the new comment' );
              // get current user info
            });

            commentCollectionView.on('itemview:render:user', function(itemview, userId){
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
          else {
            // handle the case where the comments come back undefined
          }

          Moonrakr.mainRegion.show( commentsLayoutView );

        });
      }
    }

  });

});