require('app');
require('handlebars');

var _postLayout = require('text!apps/posts/show/templates/post_layout.html');

return Moonrakr.module('Posts.Show', function(Show){

  Show.PostLayout = Marionette.Layout.extend({
    template: Handlebars.compile( _postLayout ),
    regions: {
      cmsRegion: '#cms-region',
      postRegion: '#post-region',
      commentsRegion: '#comments-region'
    }
  });

});