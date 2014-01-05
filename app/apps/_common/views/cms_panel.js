require('app');

return Moonrakr.module('Common.Views', function(Views){

  Views.CMSPanel = Marionette.ItemView.extend({
    authLevelRequired: 0 // 0 = all user types
  });

});