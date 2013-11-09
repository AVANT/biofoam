define(function(require){
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _signupForm = require('text!apps/auth/signup/templates/signup_form.html');

  return Moonrakr.module('Auth.Signup', function(Signup){

    Signup.SignupView = Marionette.ItemView.extend({
      template: Handlebars.compile( _signupForm ),
      events: {
        'click button.js-submit': 'submitClicked'
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        console.log( 'form data: ', data );
        this.trigger('form:submit');
      },

      onFormDataInvalid: function(errors){}

    });

  });

});
