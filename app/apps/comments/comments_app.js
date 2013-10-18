define(function(require){

  var Moonrakr = require('app');

  return Moonrakr.module('CommentsApp', function(CommentsApp){

    // * * * * * * * * * * * * * * * * * * * * * * * * * //
    // v1.0 dosent have comments getting its own router  //

    CommentsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'comments': 'listComments',
        'comment/new': 'newComment',
        'comment/:id': 'showComment',
        'comment/:id/edit': 'editComment'
      }
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * * //

    var API = {
      listComments: function(id){
        CommentsApp.List.Controller.listComments(id);
      },
      showComment: function(){
        CommentsApp.Show.Controller.showComment();
      },
      newComment: function(){
        CommentsApp.New.Controller.newComment();
      },
      editComment: function(){
        CommentsApp.Edit.Controller.editComment();
      }
    }

    // * * * * * * * * * * * * //
    // 'user:comments:list' ?? //
    // 'post:comments:list' ?? //
    Moonrakr.on('comments:list', function(){
      // pass in user id / post id ?
      API.listComments();
      // return composite view of comments?
    });
    // * * * * * * * * * * * * //

    Moonrakr.on('comments:show', function(id){
      // pass in comment id
      API.showComment(id);
      // return view?
    });

    Moonrakr.on('comment:new', function(){
      API.newComment();
      // return create comment view? (textarea or redactor?)
    });

    Moonrakr.on('comment:edit', function(id){
      API.editComment(id);
      // will this be the editor comment editing ability
    });


  });

});