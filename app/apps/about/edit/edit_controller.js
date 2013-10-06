define(function(require){
  var Moonrakr = require('app');
  require('apps/about/edit/edit_view');

  return Moonrakr.module('AboutApp.Edit', function(Edit){

    Edit.Controller = {
      editAbout: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var fetchingAbout = Moonrakr.request('about:entity');
        $.when(fetchingAbout).done(function(about){

          var view = new Edit.AboutView({
            model: about
          });

          view.on('form:submit', function(data){
            if(about.save(data)){
              Moonrakr.trigger('about:show');
            }
            else {
              view.triggerMethod('form:data:invalid', about.validationError);
            }
          });

          Moonrakr.mainRegion.show( view );
        });
      }
    }

  });

});