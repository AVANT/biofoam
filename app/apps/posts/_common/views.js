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

        // this.model.
      },

      onRender: function(){
        this.stickit();
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

      // SUBMIT HANDLER
      submitClicked: function(e){
        e.preventDefault();
        console.log( 'my submit button?', this.$el.find(e.target) );
        // this.trigger('form:submit');
      },

      // DELETE HANDLER //
      deleteClicked: function(e){
        var that = this;
        e.preventDefault();
        var result = window.confirm('Are you sure you want to delete this post?');
        if(result){
          that.trigger('post:delete', that.model);
        }
      },

        //////////////////////////
       // HANLDING FORM ERRORS //
      //////////////////////////

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
