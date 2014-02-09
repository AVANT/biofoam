require('app');
require('handlebars');
require('fittext');

var _post = require('text!apps/posts/list/templates/post.html');

return Moonrakr.module('Posts.List', function(List){

  List.PostSplash = Marionette.ItemView.extend({
    tagName: 'article',
    initalize: function(){
      this.model.on('change', this.render, this);
    },
    className: function(){
      // get from model whether image-focus, text-focus, or callout
      return 'post splash';
    },
    template: Handlebars.compile(_post),

    onShow:function(){
      this.$el.find('.title').fitText(null, {minFontSize: '20px', maxFontSize: '30px'});
    },

    events: {
      'click': 'showClicked'
    },

    showClicked: function(e){
      e.preventDefault();
      this.trigger('post:show', this.model);
    }

  });

});