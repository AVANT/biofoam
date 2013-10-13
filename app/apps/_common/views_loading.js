define(function(require){

  var Handlebars = require('handlebars'),
      Spinner = require('spinner');

  var Moonrakr = require('app'),
      _loadingView = require('text!apps/_common/templates/loading_view.html');

  return Moonrakr.module("Common.Views", function(Views){

    Views.ItemView = Marionette.ItemView.extend({
      initialize: function(){
        console.log("I'm a base view now");
      }
    });

    Views.Loading = Marionette.ItemView.extend({
      template: Handlebars.compile( _loadingView ),

      serializeData: function(){
        return {
          title: this.options.title || "Loading Data",
          message: this.options.message || "Please wait, data is loading"
        };
      },

      onShow: function(){
        var opts = {
          lines: 17, // The number of lines to draw
          length: 30, // The length of each line
          width: 2, // The line thickness
          radius: 54, // The radius of the inner circle
          corners: 0, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb or array of colors
          speed: 0.5, // Rounds per second
          trail: 95, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: 'auto', // Top position relative to parent in px
          left: 'auto' // Left position relative to parent in px
        };
        var target = document.getElementById('spinner');
        var spinner = new Spinner(opts).spin(target);
      }

    });

  });
});