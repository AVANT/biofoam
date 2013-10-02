define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _user = require('text!apps/users/list/templates/user.html');

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
    })

  });

});