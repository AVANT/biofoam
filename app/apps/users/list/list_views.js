/**
@module users
@submodule users.list
@namespace users.list
**/

define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _user = require('text!apps/users/list/templates/user.html'),
      _usersLayout = require('text!apps/users/list/templates/users_layout.html');
      _usersPanel = require('text!apps/users/list/templates/users_panel.html')

  return Moonrakr.module('UsersApp.List', function(List){
    /**
    @class User
    @constructor
    **/
    List.User = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile( _user ),
      events: {
        'click a': 'showClicked'
      },
      showClicked: function(e){
        e.preventDefault();
        this.trigger('user:show', this.model);
      }
    });

    /**
    @class Users
    @constructor
    **/
    List.Users = Marionette.CollectionView.extend({
      tagName: 'div',
      itemView: List.User
    });

    /**
    @class Layout
    @constructor
    **/
    List.Layout = Marionette.Layout.extend({
      template: Handlebars.compile( _usersLayout ),
      regions: {
        panelRegion: '#panel-region',
        usersRegion: '#users-region'
      }
    });

    /**
    @class CMSPanel
    @constructor
    **/
    List.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      authLevelRequired: 3, // 3 = editors and admins
      template: Handlebars.compile( _usersPanel ),
      triggers: {
        'click button.js-new': 'user:new'
      }
    });

  });

});