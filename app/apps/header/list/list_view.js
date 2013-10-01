define(function(require){

  var Handlebars = require('handlebars');

  var Moonrakr = require('app');

  var _header = require('text!apps/header/list/templates/header.html');
  var _headerLink = require('text!apps/header/list/templates/header-link.html');

  return Moonrakr.module('HeaderApp.List', function(List){

    List.Header = Marionette.ItemView.extend({
      template: Handlebars.compile( _headerLink ),
      tagName: 'li',
      events: {
        'click a': 'navigate'
      },
      navigate: function(e){
        e.preventDefault();
        this.trigger('navigate', this.model);
      },
      onRender: function(){
        if(this.model.selected){
          this.$el.addClass('active');
        };
      }
    });

    List.Headers = Marionette.CompositeView.extend({
      template: Handlebars.compile( _header ),
      className: 'navbar',
      itemView: List.Header,
      itemViewContainer: 'ul',
      events: {
        'click a.logo': 'logoClicked'
      },

      logoClicked: function(e){
        e.preventDefault();
        this.trigger('logo:clicked');
      }
    });

  }); // return module

}); // define