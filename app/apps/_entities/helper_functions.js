define(function(require){

  var Moonrakr = require('app');

  return Moonrakr.module('Entities.HelperFunctions', function(HelperFunctions){

    HelperFunctions.randomString = function(length){
      var result = '';
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = length; i > 0 ; --i){
        result += chars[Math.round( Math.random() * (chars.length-1) )];
      }
      return result;
    }

  });

});