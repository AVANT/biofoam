require('app');
require('handlebars');
require('bootstrap');
require('apps/menu/show/views/menu_link');
var _menu = require('text!apps/menu/show/views/templates/menu.html');

return Moonrakr.module('Menu.Show', function(Show){

  Show.Menu = Marionette.CompositeView.extend({
    template: Handlebars.compile( _menu ),
    className: 'nav',
    tagName: 'nav',
    itemView: Show.MenuLink,
    itemViewContainer: '#menu',
    events:{
      // catch logo click
    },
    logoClicked:function(e){
      e.preventDefault();
      this.trigger('logo:clicked');
    },
    // onShow:function(){
    //   this.$el.find('#menu').collapse('hide');
    // },
    appendHtml: function(collectionView, itemView, index){
    if (collectionView.isBuffering) {
      // buffering happens on reset events and initial renders
      // in order to reduce the number of inserts into the
      // document, which are expensive.
      collectionView.elBuffer.appendChild(itemView.el);
    }
    else {
      // If we've already rendered the main collection, just
      // append the new items directly into the element.
      collectionView.$el.prepend(itemView.el);
    }
  }
  });

});