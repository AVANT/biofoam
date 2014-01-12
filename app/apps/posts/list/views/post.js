require('app');
require('handlebars');

var _post = require('text!apps/posts/list/templates/post.html');

return Moonrakr.module('Posts.List', function(List){

  List.Post = Marionette.ItemView.extend({
    tagName: 'article',
    className: function(){
      // get from model whether image-focus, text-focus, or callout
      return 'post';
    },
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