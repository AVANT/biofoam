define(function(require){
  var Moonrakr = require('app');
  require('apps/about/edit/edit_view');

  return Moonrakr.module('AboutApp.Edit', function(Edit){

    Edit.Controller = {
      editAbout: function(){
        var view = new Edit.AboutView();

        Moonrakr.mainRegion.show( view );
      }
    }

  });

});