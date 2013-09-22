define(function(require){

  var Handlebars = require('handlebars');

  var Moonrakr = require('app'),
      _edit = require('text!apps/posts/edit/templates/edit.html');

  return Moonrakr.module('PostsApp.Edit', function(Edit){

    Edit.Post = Marionette.ItemView.extend({
      template: Handlebars.compile( _edit ),

      events: {
        'click button.js-submit': 'submitClicked'
      },

      submitClicked: function(e){
        e.preventDefault();
        console.log('edit post');
      }
    });


  }); // return

}); // define