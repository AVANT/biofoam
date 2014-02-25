require('app');
require('handlebars');

var _post = require('text!apps/posts/show/templates/post.html');
var _static_page = require('text!apps/posts/show/templates/static_page.html');

return Moonrakr.module('Posts.Show', function(Show){

  Show.Post = Marionette.ItemView.extend({
    tagName: 'article',
    className: 'post',
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
    templateHelpers: {
      getHeaderImageUrl: function(){
        // return this.headerImage.filelink;
        return this.media[0].filelink;
      },

      facebookURL: function  () {

        var baseUrl = 'https://www.facebook.com/dialog/feed?';
        // var baseUrl = 'https://www.facebook.com/sharer/sharer.php?';

        var appId = 'app_id=624628847586856';
        var display = '&display=popup';
        var name = '&name=' + encodeURIComponent(this.title);
        var caption = '&caption=' + encodeURIComponent(this.excerpt);
        var link = '&link=' + encodeURIComponent(window.location.origin); // + /media/ + this.slug;
        var redirect_uri = '&redirect_uri=' + encodeURIComponent(window.location.origin);
        var picture = '&picture=' + encodeURIComponent(this.headerImageUrl);

        var toReturn = baseUrl + appId + display + name + caption + link + redirect_uri + picture;

        // console.log('facebook', toReturn);

        // return toReturn;
        return toReturn;

      },

      twitterURL: function  () {

        // 'http://twitter.com/share?
        // text=text goes here
        // &url=http://url goes here
        // &hashtags=hashtag1,hashtag2,hashtag3'

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

        // console.log('twitter', toReturn);

        // return toReturn;
        return toReturn;

      }

    }
  });

});