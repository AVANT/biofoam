require('handlebars');
var Spinner = require('spinner');

require('app');
var _loadingView = require('text!apps/_common/views/templates/loading_view.html');

return Moonrakr.module("Common.Views", function(Views){

  Views.Loading = Marionette.ItemView.extend({
    template: Handlebars.compile( _loadingView ),

    serializeData: function(){
      return {
        // title: this.options.title || "Loading Data",
        // message: this.options.message || "Please wait, data is loading"
      };
    },

    onShow: function(){
      var opts = {
        lines: 10, // The number of lines to draw
        length: 2, // The length of each line
        width: 2, // The line thickness
        radius: 7, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#333333', // #rgb or #rrggbb or array of colors
        speed: 0.5, // Rounds per second
        trail: 50, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 175, // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      var target = document.getElementById('spinner');
      var spinner = new Spinner(opts).spin(target);
    }

  });

});
