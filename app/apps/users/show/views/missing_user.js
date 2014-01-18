require('app');
require('handlebars');

var _missingUser = require('text!apps/users/show/templates/missing_user.html');

return Moonrakr.module('Users.Show', function(Show){

  Show.MissingUser = Marionette.ItemView.extend({
    tagName: 'div',
    template: Handlebars.compile(_missingUser)
  });

});