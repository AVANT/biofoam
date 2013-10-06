define(function(require){
  window.rHandle = require('jquery.redactor');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _edit_form = require('text!apps/about/edit/templates/edit_form.html');

  return Moonrakr.module('AboutApp.Edit', function(Edit){

    Edit.AboutView = Marionette.ItemView.extend({
      template: Handlebars.compile( _edit_form ),
      events: {
        'click button.js-submit': 'submitClicked'
      },
      onRender: function(){
        this.$('#redactor').redactor({
          initCallback: function(){
            console.log( 'redactor has been initialized' );
          }
        });
      },
      submitClicked: function(e){
        e.preventDefault();
        var data = {'content': this.$('#redactor').redactor('get')}
        this.trigger('form:submit', data);
      },
      onFormDataInvalid: function(errors){
        console.log(errors);
      }
    });

  });

});