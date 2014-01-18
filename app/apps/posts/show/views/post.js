require('app');
require('handlebars');

var _post = require('text!apps/posts/show/templates/post.html');

return Moonrakr.module('Posts.Show', function(Show){

  Show.Post = Marionette.ItemView.extend({
    tagName: 'article',
    className: 'post',
    template: Handlebars.compile( _post ),
    initialize: function(){
      this.model.on('change', this.render, this);
    },
    templateHelpers: {
      getHeaderImageUrl: function(){
        // return this.headerImage.filelink;
        return this.media[0].filelink;
      }
    }
  });

});