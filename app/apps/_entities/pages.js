require('app');
require('apps/_entities/localstorage');

return Moonrakr.module('Entities', function(Entities){

  Entities.Page = Backbone.Model.extend({
    url: 'page'
  });
  Entities.configureStorage(Entities.Page);

  Entities.PageCollection = Backbone.Collection.extend({
    url: 'pages',
    model: Entities.Page
  });
  Entities.configureStorage(Entities.PageCollection);

  Entities.initializePages = function(){
    console.log('pages models entities starting to initialize');

    var pages = new Entities.PageCollection([
      {id:'about',  title:'About', content: '<p>check this shit out</p>'},
      {id:'terms', title:'Terms', content: '<p>check this shit out</p>'}
    ]);

    pages.forEach(function(page){
      page.save();
    });
    return pages.models;
  };

  var API = {
    getPageEntity: function(id){
      // check whether to init pages or not
      var page = new Entities.Page({id: id});
      var defer = $.Deferred();

      page.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(){
          defer.resolve(undefined);
        }
      });

      return defer.promise();
    }
  };

  Moonrakr.reqres.setHandler('pages:entity', function(id){
    return API.getPageEntity(id);
  });

});
