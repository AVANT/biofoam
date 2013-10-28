define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _comment = require('text!apps/comments/_common/templates/comment.html');
  var _user = require('text!apps/comments/_common/templates/user.html');

  return Moonrakr.module('CommentsApp.Common.Views', function(Views){

    Views.Comment = Marionette.Layout.extend({
      tagName: 'li',
      template: Handlebars.compile( _comment ),
      regions: {
        userInformation: '.user-information'
      },
      events: {
        'click': 'rerender'
        // 'click .user-information': 'userClicked'
      },
      // initialize: function(){
      //   // rerender when user info is rendered
      // },
      // rerender: function(){
      //   console.log('test');
      //   this.render();
      // },
      onShow: function(e){
        this.trigger('render:user', this.model.get('userId'));
      },
      userClicked: function(e){
        e.preventDefault();
        Moonrakr.trigger('user:show', this.model.get('userId'));
      }
    });

    Views.CommentUser = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _user )
    });

  });

});