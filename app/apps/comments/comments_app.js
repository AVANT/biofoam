/**
# Comments App

The comments app provides an API for other apps to request comment layout views.

Subapps:
- List
  - _common
  - ForPost
  - ForUser
- Show
  - _common
  - ForPost
  - ForUser
- New

@module Comments
**/

require('app');
require('apps/comments/show/forpost/show_controller');
require('apps/comments/show/foruser/show_controller');
require('apps/comments/list/forpost/list_controller');
require('apps/comments/list/foruser/list_controller');

return Moonrakr.module('Comments', function(Comments){

  var API = {
    // will eventually need to handle taking in a comments/for/:id value
    listForPostComments: function(){
      return Comments.List.ForPost.Controller.listComments();
    },
    // will eventually need to handle taking in a comments/for/:id value
    listForUserComments: function(){
      return Comments.List.ForUser.Controller.listComments();
    },
    showForUserComment: function(model){
      return Comments.Show.ForUser.Controller.showComment(model);
    },
    showForPostComment: function(model){
      return Comments.Show.ForPost.Controller.showComment(model);
    },
    newCommentReturn: function(){
      return Comments.New.Controller.newCommentReturn();
    }
  };

  // will eventually need to handle taking in a comments/for/:id value
  Moonrakr.reqres.setHandler('comments:listforpost', function(){
    return API.listForPostComments();
  });

  // will eventually need to handle taking in a comments/for/:id value
  Moonrakr.reqres.setHandler('comments:listforuser', function(){
    return API.listForUserComments();
  });

  Moonrakr.reqres.setHandler('comment:showforpost', function(model){
    return API.showForPostComment(model);
  });

  Moonrakr.reqres.setHandler('comment:showforuser', function(model){
    return API.showForUserComment(model);
  });

  Moonrakr.reqres.setHandler('comment:new:return', function(){
    return API.newCommentReturn();
  });

  // Moonrakr.on('comment:edit', function(id){
  //   API.editComment(id);
  // });

});