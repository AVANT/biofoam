define(function(require){

  require('apps/_common/stickit/custom_handlers');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _postForm = require('text!apps/posts/_common/templates/post-form.html');

  return Moonrakr.module('Posts.Common.Views', function(Views){

    Views.Form = Marionette.Layout.extend({
      template: Handlebars.compile( _postForm ),
      formChanged: false,

      regions: {
        imageUploadRegion: '#image-upload-region',
        redactorRegion: '#redactor-region'
      },

      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked',
      },

      bindings: {
        '#post-title': 'title',
        '#post-excerpt': 'excerpt',
        '#post-body': 'body', // in the redactor view
        '#image-current-container': 'image', // in the imageUpload view
      },

      initialize: function(){
        var that = this;
        this.model.on('change', this.modelChanged, this);
        $( window ).bind( 'beforeunload', that.beforeUnloadHandler, that );

        this.model.on('validated:invalid', this.modelValidated, this);
      },

      onRender: function(){
        this.stickit();
        Backbone.Validation.bind(this);
      },

        ///////////////////
       // INIT HANLDERS //
      ///////////////////

      modelChanged: function(){
        this.formChanged = true;
        this.trigger('model:changed');
      },

      beforeUnloadHandler: function(){
        if (this.modelChanged){
          return( 'There are changes in the form.  Do you want to leave them unsaved?');
        }
      },

        /////////////////
       // UI HANLDERS //
      /////////////////

      submitClicked: function(e){
        e.preventDefault();
        this.trigger('form:submit');
      },

      deleteClicked: function(e){
        var that = this;
        e.preventDefault();
        var result = window.confirm('Are you sure you want to delete this post?');
        if(result){
          that.trigger('post:delete', that.model);
        }
      },

        ////////////////////////////////
       // HANLDING VALIDATION ERRORS //
      ////////////////////////////////

      modelValidated: function(model, errors){
        var view = this;

        this.clearFormErrors();
        _.each(errors, function(value, key){
          view.renderFormErrors(value, key, view);
        });

        console.log('model validation errors: ', errors);
      },

      clearFormErrors: function(){
        var $view = this.$el;
        var $form = $view.find('form');
        $form.find('.help-inline.error').each(function(){
          $(this).remove();
        });
        $form.find('.control-group.error').each(function(){
          $(this).removeClass('error');
        });

      },
      renderFormErrors: function( value, key, view){
        var $view = view.$el;
        var $controlGroup = $view.find('#post-' + key).parent();
        var $errorEl = $('<span>', {class: 'help-inline error', text: value});
        $controlGroup.append($errorEl).addClass('error');
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
      }

    });

  });

});
