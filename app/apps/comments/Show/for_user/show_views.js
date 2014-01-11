require('handlebars');
require('app');
require('apps/comments/show/_common/views');
var _post = require('text!apps/comments/show/for_user/templates/post.html');

return Moonrakr.module('Comments.Show.ForUser', function(ForUser){

  ForUser.Comment = Moonrakr.Comments.Show.Common.Views.Comment.extend({
    events: {
      'click .post-information': 'postClicked'
    },
    postClicked: function(e){
      e.preventDefault();
      Moonrakr.trigger('post:show', this.model.get('postId'));
    }
  });

  ForUser.MissingComment = Moonrakr.Comments.Show.Common.Views.MissingComment.extend();

  // the only view that is specific to the user comment is the post view part
  ForUser.Post = Marionette.ItemView.extend({
    tagName: 'span',
    template: Handlebars.compile( _post )
  });

});