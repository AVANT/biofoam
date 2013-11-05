define(function(require){

  // require('backbone.picky');

  var Moonrakr = require('app');
  require('apps/header/list/list_view');

  return Moonrakr.module('HeaderApp.List', function(List){

    List.Controller = {
      // api call
      listHeader: function(){
        var self = this;
        var links = Moonrakr.request('header:entities');
        var menu = new List.Menu({collection: links});
        this.searchModel = new Moonrakr.Entities.Search();
        var search = new List.Search({
          model: this.searchModel
        });
        var login = new List.Login();
        var header = new List.Header();


        header.on('show', function(){
          this.menuRegion.show(menu);
          this.searchRegion.show(search);
          this.loginRegion.show(login);
        });

        header.on('logo:clicked', function(){
          Moonrakr.trigger('posts:list');
        });

        login.on('login:clicked', function(){
          // get current route and pass that along to the login call
          Moonrakr.trigger( 'auth:login', Moonrakr.getCurrentRoute() );
        });

        menu.on('itemview:navigate', function(childView, model){
          var trigger = model.get('navigationTrigger');
          Moonrakr.trigger( trigger );
        });

        search.on('submitClicked', function( str ){
          self.searchSubmitHandler(str);
        });

        Moonrakr.headerRegion.show(header);
      },

      setActiveHeader: function(headerUrl){
        window.links = Moonrakr.request('header:entities');
        var headerToSelect = links.find(function(header){
          return header.get('url') === headerUrl;
        });
        headerToSelect.select();
        links.trigger('reset');
      },

      setHeaderText: function(str){
        this.searchModel.set('searchText', str);
      },

      searchSubmitHandler: function( str ){
        console.log( str );
        str = str.toLowerCase();
        str = $.trim(str)
        if( str == "posts" || str == "post"){
          Moonrakr.trigger('posts:list');
        }
      }
    };

  });

});