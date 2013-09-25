define(function(require){

  var Handlebars = require('handlebars');

  var Moonrakr = require('app');

  var _postForm = require('text!apps/posts/_common/templates/post-form.html')

  return Moonrakr.module('PostsApp.Common.Views', function(Views){

    Views.Form = Marionette.ItemView.extend({
      template: Handlebars.compile( _postForm ),

      // UI EVENTS
      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked'
      },

      // SUBMIT HANDLERS //
      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      },

      onFormDataInvalid: function(errors){
        var $view = this.$el;

        var clearFormErrors = function(){
          var $form = $view.find('form');
          $form.find('.help-inline.error').each(
            function(){
              $(this).remove();
          });
          $form.find('.control-group.error').each(
            function(){
              $(this).removeClass('error');
          });
        };

        var markErrors = function(value, key){
          var $controlGroup = $view.find('#post-' + key).parent();
          var $errorEl = $('<span>', {class: 'help-inline error', text: value});
          $controlGroup.append($errorEl).addClass('error');
        };

        clearFormErrors();
        _.each(errors, markErrors);
      },

      // DELETE HANDLERS //
      deleteClicked: function(e){
        e.preventDefault();
        this.trigger('post:delete', this.model);
      }

    });

  });

});
