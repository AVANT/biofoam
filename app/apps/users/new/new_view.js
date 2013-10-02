define(function(require){

  var Handlebars = require('handlebars');

  var Moonrakr = require('app');
  var _userForm = require('text!apps/users/new/templates/user-form.html');

  return Moonrakr.module('UsersApp.New', function(New){

    New.User = Marionette.ItemView.extend({
      template: Handlebars.compile(_userForm),

      events: {
        'click button.js-submit': 'submitClicked'
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        console.log('here');
        this.trigger('form:submit', data);
      },

      onFormDataInvalid: function(errors){
        var $view = this.$el;

        var clearFormErrors = function(){
          var $form = $view.find('form');
          $form.find('.help-inline.error').each(
            function(){
              $(this).remove();
              // try $view.remove();
          });
          $form.find('.control-group.error').each(
            function(){
              $(this).removeClass('error')
              // try $view.removeClass('error');
          });
        };

        var markErrors = function(value, key){
          var $controlGroup = $view.find('#user-' + key).parent();
          var $errorEl = $('<span>', {class: 'help-inline error', text: value});
          $controlGroup.append($errorEl).addClass('error');
        };

        clearFormErrors();
        _.each(errors, markErrors);
      }

    });

  });

});