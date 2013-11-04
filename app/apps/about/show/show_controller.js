define(function(require){

  var Moonrakr = require('app');
  require('apps/about/show/show_view');

  return Moonrakr.module('AboutApp.Show', function(Show){

    Show.Controller = {
      showAbout: function(){

        Moonrakr.Common.Controller.helper.cueLoadingView();

        var authGranted = Moonrakr.Common.Controller.helper.getAuthFlag( Show.CMSPanel );

        var aboutShowLayout = new Show.Layout();
        var aboutShowPanel = authGranted ? new Show.CMSPanel() : null;

        var fetchingAbout = Moonrakr.request('about:entity');
        $.when(fetchingAbout).done(function(about){

          var aboutShowView = new Show.About({
            model: about
          });

          aboutShowLayout.on('show', function(){
            if(authGranted){aboutShowLayout.panelRegion.show( aboutShowPanel );}
            aboutShowLayout.aboutRegion.show( aboutShowView );
          })

          if(authGranted){
            aboutShowPanel.on('about:edit', function(){
              Moonrakr.trigger('about:edit');
            });
          }

          Moonrakr.mainRegion.show( aboutShowLayout );

        });
      }
    }

  });

});