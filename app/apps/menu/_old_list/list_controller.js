require('app');
require('apps/menu/list/list_views');

return Moonrakr.module('Menu.List', function(List){

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
        var navString = model.get('navigationString') || null;
        Moonrakr.trigger( trigger, navString );
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
      console.log('header to select: ', headerToSelect);
      headerToSelect.select();
      links.trigger('reset');
    },

    setHeaderText: function(str){
      this.searchModel.set('searchText', str);
    },

    searchSubmitHandler: function( str ){
      var appSwitchCases = {
        'post': {
          'eventType': 'posts:list'
        },
        'posts': {
          'eventType': 'posts:list'
        },
        'user': {
          'eventType': 'users:list'
        },
        'users': {
          'eventType': 'users:list'
        },
        'about': {
          'eventType': 'pages:show',
          'slug': 'about'
        },
        'terms': {
          'eventType': 'pages:show',
          'slug': 'terms'
        }
      };

      str = str.toLowerCase();
      str = $.trim(str);
      if( appSwitchCases[str] ){
        console.log( appSwitchCases[str].eventType );
        console.log( appSwitchCases[str].additionalParams );
        Moonrakr.trigger( appSwitchCases[str].eventType, appSwitchCases[str].slug );
      }
      else{
        // call out to server for search
      }
    }
  };

});