define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _missingUser = require('text!apps/users/show/templates/missing_user.html');
  var _user = require('text!apps/users/show/templates/user.html');
  var _cms_panel = require('text!apps/users/show/templates/cms_panel.html');
  var _userLayout = require('text!apps/users/show/templates/user_layout.html');

  return Moonrakr.module('UsersApp.Show', function(Show){

    Show.MissingPost = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile(_missingUser)
    });

    Show.User = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile(_user)
    });

    Show.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      authLevelRequired: 3, // 3=editors
      template: Handlebars.compile(_cms_panel),
      events: {
        'click .js-edit': 'editClicked'
      },
      editClicked: function(e){
        e.preventDefault();
        this.trigger('user:edit');
      }
    });

    Show.UserLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _userLayout ),
      regions: {
        cmsRegion: '#cms-region',
        userRegion: '#user-region',
        commentsRegion: '#comments-region'
      }
    });

  });

});