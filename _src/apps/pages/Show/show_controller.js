require('app');
require('apps/pages/show/show_views');

return Moonrakr.module('Pages.Show', function(Show){

  Show.Controller = {

    // api call
    showPage: function(id){

      Moonrakr.Common.Controller.helper.cueLoadingView();

      var authGranted = Moonrakr.Common.Controller.helper.getAuthFlag( Show.CMSPanel );

      var pageLayout = new Show.Layout();
      var pagePanel = authGranted ? new Show.CMSPanel() : null;

      var fetchingPage = Moonrakr.request('pages:entity', id);
      $.when(fetchingPage).done(function(page){

        if (page !== undefined){

          var pageView = new Show.Page({
            model: page
          });

          pageLayout.on('show', function(){
            if(authGranted){pageLayout.panelRegion.show(pagePanel);}
            pageLayout.pageRegion.show( pageView );
          });

          if(authGranted){
            pagePanel.on('pages:edit', function(){
              Moonrakr.trigger('pages:edit', page.get('id'));
            });
          }
        }
        else {
          // TODO: handle case where no page is returned from the server
        }

        Moonrakr.mainRegion.show( pageLayout );

      });

    }

  }

});