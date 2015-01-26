require('app');
require('handlebars');
require('fittext');

var _post = require('text!apps/threads/show/templates/post.html');

return Moonrakr.module('Threads.Show', function(Show){

  Show.Post = Marionette.ItemView.extend({
    tagName: 'article',
    className: 'post',
    template: Handlebars.compile(_post),

    onShow: function(){
      this.$el.find('.title').fitText(1, {minFontSize: '20px', maxFontSize: '30px'});
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
