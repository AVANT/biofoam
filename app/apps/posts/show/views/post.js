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
    templateHelpers: {
      getHeaderImageUrl: function(){
        // return this.headerImage.filelink;
        return this.media[0].filelink;
      },

      facebookURL: function  () {

        var baseUrl = 'https://www.facebook.com/dialog/feed?';
        // var baseUrl = 'https://www.facebook.com/sharer/sharer.php?';

        var appId = 'app_id=630547413679417';
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

          return t;

        }(this.title)

        var baseUrl = 'http://twitter.com/share?';

        // var text = 'text={{ concatTitle }}';
        var url = '&url=' + encodeURIComponent(window.location.origin); // + /media/ + this.slug;
        var hashtags = '&hashtags=vvvnt';

        var toReturn = baseUrl + url + hashtags;

        // console.log('twitter', toReturn);

        // return toReturn;
        return toReturn;

      }

    }
  });

});