require('marionette');
require('handlebars');

var _footer = require('text!apps/footer/show/templates/footer.html');

return Marionette.CompositeView.extend({
  template: Handlebars.compile( _footer ),
  tagName: 'div',
  className: 'footer',

  ui: {
    message: '.js-message'
  },

  events:{
    'click .js-about': 'aboutClicked',
    'click .js-privacy': 'privacyClicked',
    'click .js-sponsorship': 'sponsorshipClicked'
  },

  aboutClicked:function(e){
    e.preventDefault()
    this.trigger('about:clicked')
  },

  privacyClicked:function(e){
    e.preventDefault()
    this.trigger('privacy:clicked')
  },

  sponsorshipClicked:function(e){
    e.preventDefault()
    this.trigger('sponsorship:clicked')
  }
});
