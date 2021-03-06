require('app');
require('apps/_entities/localstorage');

return Moonrakr.module('Entities', function(Entities){

  Entities.User = Backbone.Model.extend({
    // url: 'users',
    url: function(){
      if ( this.get('id') ){
        console.log('are we here?');
        return Moonrakr.Config.api + '/users/' + this.get('id');
      }
      else {
        return Moonrakr.Config.api + '/users/';
      }
    },
    parse: function( resp, options ){

      var obj = {};
      obj.userImageUrl = resp.userImage.filelink;

      // obj will override any samename properties of resp
      _.extend(resp, obj);

      return resp;
    }
  });
  // SETTING UP MODEL TO USE LOCAL STORAGE
  // Entities.configureStorage(Entities.User);

  Entities.UserCollection = Backbone.Collection.extend({
    url: function(){
      return Moonrakr.Config.api + '/users/';

    },
    model: Entities.User,
    // comparator: 'lastName'
  });
  // Entities.configureStorage(Entities.UserCollection);

  var initializeUsers = function(){
    console.log('user entities initialized')
    var users = new Entities.UserCollection([
      {id:1, username: 'Ced'},
      {id:2, username: 'Che'},
      {id:3, username: 'Sam'},
    ]);
    users.forEach(function(user){
      user.save();
    });
    return users.models;
  };

  var API = {
    getUserEntities: function(){
      var users = new Entities.UserCollection();
      var defer = $.Deferred();
      users.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();

      // HANDLE THE CASE WHERE THERE ARE NO USERS RETURNED //
      // $.when(promise).done(function(users){
      //   if(users.length === 0){
      //     // var models = initializeUsers();
      //     // users.reset(models);
      //   }
      // });
      // END CASE HANDLING

      return promise;
    },
    getUserEntity: function(userId){
      var user = new Entities.User({ 'id': userId});
      var defer = $.Deferred();
      user.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(){
          defer.resolve(undefined);
          // instead perhaps try passing the server errors thru?
        }
      });
      return defer.promise();
    }
  };

  Moonrakr.reqres.setHandler('user:entities', function(){
    return API.getUserEntities();
  });

  Moonrakr.reqres.setHandler('user:entity', function(id){
    return API.getUserEntity(id);
  });

});  // return module