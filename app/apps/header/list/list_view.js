define(function(require){

  var Handlebars = require('handlebars');

  var Moonrakr = require('app');

  var _header = require('text!apps/header/list/templates/header.html');
  var _headerLink = require('text!apps/header/list/templates/header-link.html');

  return Moonrakr.module('HeaderApp.List', function(List){

    List.Header = Marionette.ItemView.extend({
      template: Handlebars.compile( _headerLink ),
      tagName: 'li'
    });

    List.Headers = Marionette.CompositeView.extend({
      template: Handlebars.compile( _header ),
      className: 'navbar',
      itemView: List.Header,
      itemViewContainer: 'ul'
    });

  }); // return module

}); // define