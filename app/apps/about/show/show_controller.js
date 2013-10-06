define(function(require){

  var Moonrakr = require('app');
  require('apps/about/show/show_view');

  return Moonrakr.module('AboutApp.Show', function(Show){

    Show.Controller = {
      showAbout: function(){
        var loadingView = new Moonrakr.Common.Views.Loading({
          title: 'Loading',
          message: ''
        });
        Moonrakr.mainRegion.show( loadingView );

        var aboutShowLayout = new Show.Layout();
        var aboutShowPanel = new Show.Panel();

        var fetchingAbout = Moonrakr.request('about:entity');
        $.when(fetchingAbout).done(function(about){

          var aboutShowView = new Show.About({
            model: about
          });

          aboutShowLayout.on('show', function(){
            aboutShowLayout.panelRegion.show( aboutShowPanel );
            aboutShowLayout.aboutRegion.show( aboutShowView );
          })

          aboutShowPanel.on('about:edit', function(){
            Moonrakr.trigger('about:edit');
          });

          Moonrakr.mainRegion.show( aboutShowLayout );

        });
      }
    }

  });

});