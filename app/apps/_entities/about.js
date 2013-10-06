define(function(require){

  var Moonrakr = require('app');
  require('apps/_entities/localstorage');

  return Moonrakr.module('Entities', function(Entities){

    Entities.About = Backbone.Model.extend({
      url: 'about'
    });
    Entities.configureStorage(Entities.About);

    Entities.initializeAbout = function(){
      console.log('about entity initialized');

      var about = new Entities.About({
        id: 1,
        content: '<h1>About Page</h1><p>Lorem ipsum sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
      });
      about.save();
      return about;
    };

    var API = {
      getAboutEntity: function(){
        var about = new Entities.About({id: 1});
        var defer = $.Deferred();

        about.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });

        // HANDLE THE CASE WHERE THERE IS NO ABOUT PAGE YET
        $.when(defer.promise()).done(function(about){
          window.aaa = about;
          if(about.attributes.id !== 1){
            var about = initializeAbout();
          }
        })

        return defer.promise();
      }
    }

    Moonrakr.reqres.setHandler('about:entity', function(){
      return API.getAboutEntity();
    });

  });

});