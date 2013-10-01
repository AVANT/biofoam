define(function(require){

  var Moonrakr = require('app');
  require('apps/header/list/list_view');

  return Moonrakr.module('HeaderApp.List', function(List){

    List.Controller = {
      listHeader: function(){
        var links = Moonrakr.request('header:entities');
        var headers = new List.Headers({collection: links});

        Moonrakr.headerRegion.show(headers);
      }
    };

  }); // return module

}); // define