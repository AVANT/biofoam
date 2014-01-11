require('app');
require('handlebars');
require('apps/_common/views/cms_panel');

var _postsPanel = require('text!apps/list/templates/post_panel.html');

return Moonrakr.module('Posts.List', function(List){

  List.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
    authLevelRequired: 2, // 2 = authors, editors, and admins
    template: Handlebars.compile( _postsPanel ),
    triggers: {
      'click button.js-new': 'post:new'
    },
    templateHelpers: {
      newPostAction: function(){
        return 'New Post';
      }
    }
  });

});