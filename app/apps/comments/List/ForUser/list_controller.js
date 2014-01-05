require('app');
require('apps/comments/list/foruser/list_views');

return Moonrakr.module('Comments.List.ForUser', function(ForUser){

  ForUser.Controller = {

    // TODO write out some comments here about how this works

    // api call
    listComments: function(){
      // this.cueLoading();
      this.fetchComments();
      return this.commentContainer;
    },
    // cueLoading: function(){
    //   var loadingView = new Moonrakr.Common.Views.Loading();
    //   Moonrakr.mainRegion.show( loadingView );
    // },
    fetchComments: function(){
      var self = this;
      var fetchingComments = Moonrakr.request('comment:entities');
      $.when(fetchingComments).done(function(comments){
        if (comments !== undefined){
          self.commentContainer = new ForUser.Comments({
            collection: comments
          });
        }
        else {
          console.log('failed to get collection of comments');
          // TODO handle the case the where the comments is undefined
        }
        // Moonrakr.mainRegion.show( self.commentContainer );
      });

    }

  }

});