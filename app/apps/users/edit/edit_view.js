define(function(require){
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/users/_common/views');

  return Moonrakr.module('UsersApp.Edit', function(Edit){

    Edit.User = Moonrakr.UsersApp.Common.Views.Form.extend({});

  });

});