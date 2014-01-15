require('app');
require('handlebars');

var _user = require('text!apps/users/show/templates/user.html');

return Moonrakr.module('Users.Show', function(Show){

  Show.User = Marionette.ItemView.extend({
    tagName: 'div',
    template: Handlebars.compile(_user)
  });

});