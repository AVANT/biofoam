define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/users/_common/views');

  return Moonrakr.module('UsersApp.New', function(New){

    New.User = Moonrakr.UsersApp.Common.Views.Form.extend({
      onRender: function(){
        this.$('.js-submit').text('Create User');
        this.$('h1').text('New User'); // dirty hack
      }
    });

  });

});