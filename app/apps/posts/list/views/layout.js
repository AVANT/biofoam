require('app');
require('handlebars');

var _postsLayout = require('text!apps/posts/list/templates/post_layout.html');

return Moonrakr.module('Posts.List', function(List){

  List.Layout = Marionette.Layout.extend({
    template: Handlebars.compile( _postsLayout ),
    regions: {
      panelRegion: '#panel-region',
      postsRegion: '#posts-region'
    }

  });

});