require('app');
require('apps/comments/new/new_views');

return Moonrakr.module('Comments.New', function(New){

  New.Controller = {
    newComment: function(){
      this.initViewsModels();
      this.addSubmitHandler();
      Moonrakr.mainRegion.show( this.commentView );
    },
    newCommentReturn: function(){
      this.initViewsModels();
      this.addSubmitHandler();
      return this.commentView;
    },
    initViewsModels: function(){
      this.comment = new Moonrakr.Entities.Comment();
      this.commentView = new New.Comment({
        model: this.comment
      });
    },
    addSubmitHandler: function(){
      this.commentView.on('comment:submit', function(){
        var data = {
          userId: Moonrakr.AuthApp.currentUser.get('id'),
          id: Moonrakr.Entities.HelperFunctions.randomString(32) // not needed with live server
        };
        this.model.save(data);
      });
    }
  };

});