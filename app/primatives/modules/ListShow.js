define(function(){

  return function(SubApp, App, Backbone, Marionette, $, _){

      //////////////////////
     // SubApp Variables //
    //////////////////////
    SubApp.myRouteLabel = '';
    SubApp.listRegion = {};
    SubApp.showRegion = {};

    SubApp.Router = Marionette.AppRouter.extend({
      initialize: function(options){
        var modelName = options.name; // figure out how to set when making an instance of this module
        var modelPlural = modelName + 's';
        var modelId = modelPlural + '/:id';

        this.route(modelPlural, 'list', options.controller.list);
        this.route(modelId, 'show', options.controller.show);
      }
    });

    SubApp.addInitializer(function(){
      new SubApp.Router({ controller: SubApp.API, 'name': SubApp.myRouteLabel});
    });

    SubApp.API = {
      list: function(){
        SubApp.Controller.list();
      },
      show: function(id){
        SubApp.Controller.show(id);
      }
    };

    SubApp.Controller = {
      list: function(){
        console.log('list fired from seed');

        SubApp.listRegion.close();
        var c = new SubApp.Collection({});
        c.fetch();
        // console.log( new SubApp.ItemView({}) );
        var v = new SubApp.CollectionView({ collection: c });
        console.log( new SubApp.ItemView({}) );
        SubApp.listRegion.show( v );
      },
      show: function(id){
        console.log('show fired from seed', id);
      }
    };

      //////////////////
     // SubApp Views //
    //////////////////

    SubApp.ItemView = Marionette.ItemView.extend({

    });

    SubApp.CollectionView = Marionette.CollectionView.extend({
      itemView: SubApp.ItemView
    });

      /////////////////////
     // SubApp Entities //
    /////////////////////

    SubApp.Model = Backbone.Model.extend({

    });

    SubApp.Collection = Backbone.Collection.extend({
      model: SubApp.Model
    });

  };

});
