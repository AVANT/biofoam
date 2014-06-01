require('app');
require('handlebars');

// HACKY HACKY
require('slick');

var _post = require('text!apps/posts/show/templates/post.html');
var _static_page = require('text!apps/posts/show/templates/static_page.html');

return Moonrakr.module('Posts.Show', function(Show){

  Show.Post = Marionette.ItemView.extend({
    tagName: 'article',
    className: 'post',
    events: {
      'click .fbook-share': 'facebookClicked'
    },
    // hack to get different template rendering for static pages
    getTemplate: function(){
      if (this.model.get('id') == 'about' || this.model.get('id') == 'privacy' || this.model.get('id') == 'sponsorship'){
        return Handlebars.compile( _static_page );
      } else {
        return Handlebars.compile( _post );
      }
    },
    initialize: function(){
      this.model.on('change', this.render, this);
    },
    onRender:function () {
      this.startCarousel();
      this.addCarouselHandlers();
    },
    onShow: function onShow () {
      this.addModuleStyles();
      this.addModuleMarkdown();
      this.addModuleScripts();
    },
    onClose: function onClose () {
      // clean up styles
      $('head').find('.moduleStyles').remove();
      // clean up scripts
      $('head').find('.moduleScripts').remove();
    },
    addModuleStyles: function addModuleStyles () {
      // append css to head tag
      var moduleStyles = $('<style>', {
        class: 'moduleStyles',
        text: this.model.get('cssData')
      });
      $('head').append( moduleStyles );
    },
    addModuleMarkdown: function addModuleMarkdown () {
      // append html to module container
      var moduleHTML = this.model.get('htmlData');
      this.$el.find('.moduleContainer').html(moduleHTML);
    },
    addModuleScripts: function addModuleaddModuleScriptsStyles () {
      // insert javascript as a script tag? or call it if it is a function?
      var moduleScripts = $('<script>', {
        class: 'moduleScripts',
        text: this.model.get('javascriptData')
      });
      this.$el.find('.moduleContainer').append(moduleScripts);
    },
    startCarousel: function(){
      this.$el.find('#myCarousel').carousel({
        interval: 0
      });
    },
    addCarouselHandlers:function () {
      var _this = this;
      // handles the carousel thumbnails
      _this.$el.find('[id^=carousel-selector-]').on('click', function(){
        var id_selector = $(this).attr('id');
        var id = id_selector.substr(id_selector.length -1);
        id = parseInt(id);
        console.log('here with this id', id );
        _this.$el.find('#myCarousel').carousel(id);
        _this.$el.find('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
      });

      // when the carousel slides, auto update
      _this.$el.find('#myCarousel').on('slid.bs.carousel', function () {
        var id = _this.$el.find('.item.active')[1].dataset.slideNumber;
        id = parseInt(id);
        _this.$el.find('[id^=carousel-selector-]').removeClass('selected');
        _this.$el.find('[id^=carousel-selector-'+id+']').addClass('selected');
      });
    },
    facebookClicked: function () {
      var _this = this;
      var params = {
        method: 'feed',
       name: _this.model.get('title'),
       caption: 'www.vvvnt.com',
       description: _this.model.get('excerpt'),
       link: document.URL,
       picture: _this.model.get('headerImageUrl')
      };

      function fbCallback (response) {
        if (response && response.post_id) {
          console.log('Post was published.');
        } else {
          console.log('Post was not published.');
        }
      }

      FB.ui( params, fbCallback );
    },
    templateHelpers: {
      getHeaderImageUrl: function(){
        // return this.headerImage.filelink;
        return this.media[0].filelink;
      },

      facebookURL: function  () {
        var _this = this;

        FB.ui(
          {
           method: 'feed',
           name: _this.model.get('title'),
           caption: _this.model.get('excerpt'),
           link: document.URL,
           // picture: _this.model.get('headerImageUrl')
          },
          function(response) {
            if (response && response.post_id) {
              console.log('Post was published.');
            } else {
              console.log('Post was not published.');
            }
          }
        );
      },

      twitterURL: function  () {

        var concatTitle = function (t) {
          if( t.length > 100 ){
            return t.substring(1, 100) + '...';
          }
          return encodeURIComponent(t);
        }(this.title);

        var baseUrl = 'http://twitter.com/share?';

        var url = '&url=' + encodeURIComponent(window.location.href); // + /media/ + this.slug;
        var text = '&text=' + concatTitle;
        var via = '&via=VVVNTmag';

        var toReturn = baseUrl + text + url + via;

        return toReturn;

      }

    }
  });

});