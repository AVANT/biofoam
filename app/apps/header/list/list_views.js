define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _menu = require('text!apps/header/list/templates/menu.html');
  var _menuLink = require('text!apps/header/list/templates/menu-link.html');
  var _search = require('text!apps/header/list/templates/search.html');
  var _login = require('text!apps/header/list/templates/login.html');
  var _header = require('text!apps/header/list/templates/header.html');

  return Moonrakr.module('HeaderApp.List', function(List){

    List.MenuLink = Marionette.ItemView.extend({
      template: Handlebars.compile( _menuLink ),
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

    List.Menu = Marionette.CompositeView.extend({
      template: Handlebars.compile( _menu ),
      className: 'navbar',
      itemView: List.MenuLink,
      itemViewContainer: 'ul'
    });

    List.Search = Marionette.ItemView.extend({
      template: Handlebars.compile( _search ),
      bindings: {
        '#search-input': 'searchText'
      },
      events: {
        'click .js-submit': 'submitClicked',
        'keypress #search-input': 'keypressHanlder'
      },
      initialize: function(){
        // catch document wide keypresses
        // this.setKeyboardWatcher();
      },
      onRender: function(){
        this.stickit();
      },
      keypressHanlder: function(e){
        if(e.keyCode == 13){
          e.preventDefault();
          this.submitHandler();
        }
      },
      setKeyboardWatcher: function(){
        var that = this;
        $(document).on('keyup', function(e){
          // this.trigger('keyup', e);
          console.log( String.fromCharCode(e.keyCode) );
          var str = String.fromCharCode(e.keyCode);
          that.$el.find('#search-input').html( str );
          that.$el.find('#search-input').selectRange(2);
          that.releaseKeyboardWatcher();
        });
      },
      releaseKeyboardWatcher: function(){
        $(document).unbind('keyup');
      },
      submitClicked: function(e){
        e.preventDefault();
        this.submitHandler();
      },
      submitHandler: function(){
        // get input text
        this.trigger('submitClicked', this.model.get('searchText'));
        this.setKeyboardWatcher();
      }
    });

    List.Login = Marionette.ItemView.extend({
      template: Handlebars.compile( _login ),
      events: {
        'click .js-login': 'loginClicked'
      },
      loginClicked: function(e){
        e.preventDefault();
        this.trigger('login:clicked');
      }
    });

    List.Header = Marionette.Layout.extend({
      template: Handlebars.compile( _header ),
      regions: {
        menuRegion: '#menu',
        searchRegion: '#search',
        loginRegion: '#login'
      },
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