require('app');

return Moonrakr.module('Entities', function(Entities){

  Entities.Auth = Backbone.Model.extend({
    url: function(){
      return Moonrakr.Config.api + '/login';
    }
  });

  var API = {
    getAuthEntity: function(){
      return new Entities.Auth();
    }
  };

  Moonrakr.reqres.setHandler('entities:auth', function(){
    return API.getAuthEntity();
  });

});