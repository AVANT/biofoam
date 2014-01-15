require('app');
require('handlebars');
require('apps/_common/views/cms_panel');

var _cms_panel = require('text!apps/users/show/templates/cms_panel.html');

return Moonrakr.module('Users.Show', function(Show){

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

});