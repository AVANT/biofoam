require('app');
require('handlebars');

var _userLayout = require('text!apps/users/show/templates/user_layout.html');

return Moonrakr.module('Users.Show', function(Show){

  Show.UserLayout = Marionette.Layout.extend({
    template: Handlebars.compile( _userLayout ),
    regions: {
      cmsRegion: '#cms-region',
      userRegion: '#user-region',
      commentsRegion: '#comments-region'
    }
  });


});