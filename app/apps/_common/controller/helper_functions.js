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
      getOwnershipFlag: function(model, type){
        if(type=="user"){
          var userId = Moonrakr.request('auth:id');
          var itemOwner = model.get('id');
          if(userId == itemOwner){
            return true;
          }
        }

        return false;
      },
      cueLoadingView: function(){
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );
      }
    }

  });

});