define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _missingUser = require('text!apps/users/show/templates/missing_user.html');
  var _user = require('text!apps/users/show/templates/user.html');
  var _userLayout = require('text!apps/users/show/templates/user_layout.html');

  return Moonrakr.module('UsersApp.Show', function(Show){

    Show.MissingPost = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile(_missingUser)
    });

    Show.User = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile(_user),
      events: {
        'click a.js-edit': 'editClick'
      },

      editClicked: function(e){
        e.preventDefault();
        this.trigger('user:edit', this.model);
      }
    });

    Show.UserLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _userLayout ),
      regions: {
        userRegion: '#user-region',
        commentsRegion: '#comments-region'
      }
    });

  });

});