define(function(require){

  var Moonrakr = require('app');

  return Moonrakr.module('Common.Controller', function(Controller){

    Controller.helper = {
      getAuthFlag: function( CMSPanel ){
        var userAuthLevel = Moonrakr.request('auth:userpermissions');
        var authLevelRequired = CMSPanel.prototype.authLevelRequired;
        if (userAuthLevel >= authLevelRequired){
          return true;
        }
        else {
          return false;
        }
      },
      cueLoadingView: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );
      }
    }

  });

});