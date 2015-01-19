require('app');

return Moonrakr.module('Entities', function(Entities){

  Entities.Search = Backbone.Model.extend({
    url: '', // will there be a straight up search url??
    defaults: {
      searchText: ''
    }
  });

});