define(function(require){

  require('backbone.picky');

  var Moonrakr = require('app');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Header = Backbone.Model.extend({
      initialize: function(){
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
      model: Entities.Header,
      initialize: function(){
        var singleSelect = new Backbone.Picky.SingleSelect(this);
        _.extend(this, singleSelect);
      }
    });

    var initializeHeaders = function(){
      Entities.headers = new Entities.HeaderCollection([
        { name: 'Posts', url: 'posts' },
        { name: 'About', url: 'about' }
      ]);
    };

    var API = {
      getHeaders: function(){
        if(Entities.headers === undefined){
          initializeHeaders();
        }
        return Entities.headers;
      }
    };

    Moonrakr.reqres.setHandler('header:entities', function(){
      return API.getHeaders();
    });

  }); // return module

}); // define