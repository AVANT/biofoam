define(function(require){

  // require('backbone.stickit');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _newComment = require('text!apps/comments/new/templates/comment.html');

  return Moonrakr.module('Comments.New', function(New){

    New.Comment = Marionette.ItemView.extend({
      template: Handlebars.compile( _newComment ),
      bindings: {
        '#comment-body': 'body'
      },
      events: {
        'click .js-submit': 'submitClicked'
      },
      onRender: function(){
        this.stickit();
      },
      submitClicked: function(e){
        e.preventDefault();
        this.trigger('comment:submit');
      }
    });

  });

});