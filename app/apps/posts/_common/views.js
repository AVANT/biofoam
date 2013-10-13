define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _postForm = require('text!apps/posts/_common/templates/post-form.html')

  return Moonrakr.module('PostsApp.Common.Views', function(Views){

    Views.Form = Marionette.ItemView.extend({
      template: Handlebars.compile( _postForm ),
      confirmDelete: 'Are you sure you want to delete this post?',

      // UI EVENTS
      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked',
        'focus input': 'setLeaveAlert'
      },

      // REDACTOR HANDLER //
      onRender: function(){
        this.$('.redactor').redactor();
      },

      // SUBMIT HANDLER //
      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      },

      // DELETE HANDLER //
      deleteClicked: function(e){
        var that = this;
        e.preventDefault();
        bootbox.confirm('Are you sure you want to delete this post?', function(result){
          if(result){
            that.trigger('post:delete', that.model);
          }
        });
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

      // LEAVING WITHOUT SAVING ALERT //
      setLeaveAlert: function(e){
        // console.log('a leave alert was set');

        // CHECK TO SEE IF ANY FORM INFO CHANGED

        // CATCH FOR CLOSING THE WINDOW
        // window.onbeforeunload = function(){return 'Any changes you made will be lost.';};

        // CATCH FOR USING BACK OR FORWARD BUTTONS
        // window.onpopstate = function(event) {
        //   event.preventDefault();
        //   alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
        // };
        // end to clean up popstate if they choose to move on
      }

    });

  });

});
