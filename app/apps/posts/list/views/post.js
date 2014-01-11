require('app');
require('handlebars');

var _post = require('text!apps/posts/list/templates/post.html');

return Moonrakr.module('Posts.List', function(List){

  List.Post = Marionette.ItemView.extend({
    tagName: 'article',
    template: Handlebars.compile(_post),
    events: {
      'click': 'showClicked'
    },
    showClicked: function(e){
      e.preventDefault();
      this.trigger('post:show', this.model);
    }
  });

});