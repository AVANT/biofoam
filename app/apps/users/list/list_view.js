define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _user = require('text!apps/users/list/templates/user.html'),
      _usersLayout = require('text!apps/users/list/templates/users_layout.html');
      _usersPanel = require('text!apps/users/list/templates/users_panel.html')

  return Moonrakr.module('UsersApp.List', function(List){

    List.User = Marionette.ItemView.extend({
      tagName: 'div',
      template: Handlebars.compile( _user ),
      events: {
        'click': 'showClicked'
      },
      showClicked: function(e){
        e.preventDefault();
        this.trigger('user:show', this.model);
      }
    });

    List.Users = Marionette.CollectionView.extend({
      tagName: 'div',
      itemView: List.User
    });

    List.Layout = Marionette.Layout.extend({
      template: Handlebars.compile( _usersLayout ),
      regions: {
        panelRegion: '#panel-region',
        usersRegion: '#users-region'
      }
    });

    List.Panel = Marionette.ItemView.extend({
      template: Handlebars.compile( _usersPanel ),
      triggers: {
        'click button.js-new': 'user:new'
      }
    });

  });

});