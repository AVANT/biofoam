/**
@module users
@submodule users.show
**/

define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _missingUser = require('text!apps/users/show/templates/missing_user.html');
  var _user = require('text!apps/users/show/templates/user.html');
  var _cms_panel = require('text!apps/users/show/templates/cms_panel.html');
  var _userLayout = require('text!apps/users/show/templates/user_layout.html');

  return Moonrakr.module('UsersApp.Show', function(Show){

    /**
    @class MissingPost
    @constructor
    @namespace users.show
    @requires handlebars, missing_user.html
    **/
    Show.MissingPost = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile(_missingUser)
    });

    /**
    @class User
    @constructor
    @namespace users.show
    @requires handlebars, user.html
    **/
    Show.User = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile(_user)
    });

    /**
    @class CMSPanel
    @constructor
    @namespace users.show
    @requires handlebars, cms_panel.html
    **/
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

    /**
    @class UserLayout
    @constructor
    @namespace users.show
    @requires handlebars, cms_panel.html
    **/
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