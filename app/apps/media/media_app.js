require('app');
require('apps/media/new/new_controller');

return Moonrakr.module('Media', function(Media){

  var API = {
    newMedia: function(){
      return Media.New.Controller.newMedia();
    }
  };

  Moonrakr.reqres.setHandler('media:new', function(){
    return API.newMedia();
  });

});