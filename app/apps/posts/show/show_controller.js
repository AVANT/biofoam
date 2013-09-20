define(function(require){
  var Moonrakr = require('app');
  return Moonrakr.module('PostsApp.Show', function(Show){
    Show.Controller = {
      showPost: function(model){
        console.log("showContact called for model:", model)
      }
    }
  });
});