require('app');
require('handlebars');

var _footer = require('text!apps/footer/show/templates/footer.html');

return Moonrakr.module('Footer.Show', function(Show){

  Show.Footer = Marionette.CompositeView.extend({
    template: Handlebars.compile( _footer ),
    tagName: 'div',
    className: 'footer',
    events:{},
  });

});