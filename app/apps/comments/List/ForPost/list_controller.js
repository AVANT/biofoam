define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/list/forpost/list_view');

  return Moonrakr.module('CommentsApp.List.ForPost', function(ForPost){

    ForPost.Controller = {

      // TODO write out some comments here about how this works

      // API call
      listComments: function(){
        // this.initViewsModels();
        this.fetchComments()
        return this.commentContainer;
      },
      // initViewsModels: function(){
      //   // new view
      //   // layout view
      // }
      fetchComments: function(){
        var self = this;
        var fetchingComments = Moonrakr.request('comment:entities');
        $.when(fetchingComments).done(function(comments){
          // var commentContainer;
          if (comments !== undefined ){

            // insert comments in new comments view
            self.commentContainer = new ForPost.Comments({
              collection: comments
            });

          }
          else {
            console.log('failed to get collection of comments for post');
            // TODO handle the case where the comments collection back undefined
          }

          // Moonrakr.mainRegion.show( commentContainer );
        });
      }


    }

  });

});