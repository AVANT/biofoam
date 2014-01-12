require('app');
require('handlebars');

var _missingPost = require('text!apps/posts/show/templates/missing_post.html');

return Moonrakr.module('Posts.Show', function(Show){

  Show.MissingPost = Marionette.ItemView.extend({
    tagName: 'article',
    template: Handlebars.compile( _missingPost )
  });

});