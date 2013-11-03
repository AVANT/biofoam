define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _comment = require('text!apps/comments/show/_common/templates/comment.html');
  var _missingComment = require('text!apps/comments/show/_common/templates/missing_comment.html');

  return Moonrakr.module('CommentsApp.Show.Common.Views', function(Views){

    Views.Comment = Marionette.Layout.extend({
      tagName: 'li',
      template: Handlebars.compile( _comment ),
      regions: {
        addContext: '.js-add-context'
      },
      events: {
        'click .user-information': 'userClicked',
        'click .js-delete': 'deleteClicked'
      },
      onShow: function(e){
        this.trigger('render:user', this.model.get('userId'));
        this.trigger('render:post', this.model.get('postId'));
      },
      userClicked: function(e){
        e.preventDefault();
        Moonrakr.trigger('user:show', this.model.get('userId'));
      },
      deleteClicked: function(e){
        e.preventDefault();
        this.trigger('comment:delete');
      }
    });

    Views.MissingComment = Marionette.ItemView.extend({
      template: Handlebars.compile( _missingComment )
    });

  });

});