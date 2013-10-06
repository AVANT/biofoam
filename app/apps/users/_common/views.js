define(function(require){
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _userForm = require('text!apps/users/_common/templates/user_form.html');

  return Moonrakr.module('UsersApp.Common.Views', function(Views){

    Views.Form = Marionette.ItemView.extend({
      confirmDelete: 'Are you sure you want to delete this?',
      template: Handlebars.compile( _userForm ),
      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked'
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      },

      deleteClicked: function(e){
        e.preventDefault();
        var result = confirm( this.confirmDelete );
        if (result){
          this.trigger('user:delete', this.model);
        }
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