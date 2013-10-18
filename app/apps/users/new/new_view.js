define(function(require){

  var Moonrakr = require('app');
  require('apps/users/_common/views');

  return Moonrakr.module('UsersApp.New', function(New){

    New.User = Moonrakr.UsersApp.Common.Views.Form.extend({
      templateHelpers: {
        submitText: 'Create User',
        titleText: 'New User'
      }

    });

  });

});