define(function(require){

  var Moonrakr = require('app');
  require('apps/_entities/localstorage');

  return Moonrakr.module('Entities', function(Entities){

    Entities.About = Backbone.Model.extend({
      url: 'about'
    });
    Entities.configureStorage(Entities.About);

    var initializeAbout = function(){
      console.log('about entity initialized');

      var about = new Entities.About({
        id: 1,
        content: '<h1>About Page</h1><p>Lorem ipsum sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
      });
      window.aaa = about;
      about.save();
      window.aaa2 = about;
      return about;
    };

    var API = {
      getAboutEntity: function(){
        var about = new Entities.About({id: 1});
        var defer = $.Deferred();

        about.fetch({
          success: function(data){
            window.ccc = data;
            defer.resolve(data);
          }
        });

        window.bbb = about;

        // HANDLE THE CASE WHERE THERE IS NO ABOUT PAGE YET
        $.when(defer.promise()).done(function(about){
          if(about.attributes.content == undefined){
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