define(function(require){

  var Moonrakr = require('app');
  require('apps/_entities/localstorage');

  return Moonrakr.module('Entities', function(Entities){

    Entities.User = Backbone.Model.extend({
      url: 'users'
    });
    // SETTING UP MODEL TO USE LOCAL STORAGE
    Entities.configureStorage(Entities.User);

    Entities.UserCollection = Backbone.Collection.extend({
      url: 'users',
      model: Entities.User,
      comparator: 'lastName'
    });
    Entities.configureStorage(Entities.Collection);


  });  // return module

}); // define