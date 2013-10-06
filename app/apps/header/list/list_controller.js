define(function(require){

  // require('backbone.picky');

  var Moonrakr = require('app');
  require('apps/header/list/list_view');

  return Moonrakr.module('HeaderApp.List', function(List){

    List.Controller = {
      listHeader: function(){
        var links = Moonrakr.request('header:entities');
        var headers = new List.Headers({collection: links});

        headers.on('logo:clicked', function(){
          Moonrakr.trigger('posts:list');
        });

        headers.on('login:clicked', function(){
          // get current route and pass that along to the login call
          Moonrakr.trigger( 'auth:login', Moonrakr.getCurrentRoute() );
        });

        headers.on('itemview:navigate', function(childView, model){
          var trigger = model.get('navigationTrigger');
          Moonrakr.trigger( trigger );
        });

        Moonrakr.headerRegion.show(headers);
      },

      setActiveHeader: function(headerUrl){
        window.links = Moonrakr.request('header:entities');
        var headerToSelect = links.find(function(header){
          return header.get('url') === headerUrl;
        });
        headerToSelect.select();
        links.trigger('reset');
      }
    };

  });

});