define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _commentsContainer = require('text!apps/comments/list/_common/templates/comments_container.html');

  return Moonrakr.module('Comments.List.Common.Views', function(Views){

    Views.Comments = Marionette.CompositeView.extend({
      tagName: 'div',
      template: Handlebars.compile( _commentsContainer ),
      itemViewContainer: 'ul',
      // itemView: use specific item view for the case at hand
      // buildItemView: to impliment you need to extend the build item view
    });

  });

});