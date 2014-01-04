define(function(require){

  var Moonrakr = require('app');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Media = Backbone.Model.extend({
      url: function(){
        return Moonrakr.Config.api + '/media';
      }
    });

  });

});