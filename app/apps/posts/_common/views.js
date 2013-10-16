define(function(require){
  require('backbone.stickit');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _postForm = require('text!apps/posts/_common/templates/post-form.html')

  return Moonrakr.module('PostsApp.Common.Views', function(Views){

    Views.Form = Marionette.Layout.extend({
      template: Handlebars.compile( _postForm ),
      formChanged: false,

      regions: {
        redactorRegion: '#redactor-region'
      },

      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked',
      },

      bindings: {
        '#post-title': 'title',
        '#post-excerpt': 'excerpt',
        '#post-body': 'body' // in the redactor view
      },

      initialize: function(){
        var that = this;
        this.model.on('change', this.modelChanged, this)
        $( window ).bind( 'beforeunload', that.beforeUnloadHandler );
      },

      modelChanged: function(){
        this.formChanged = true;
        this.trigger('model:changed');
      },

      onRender: function(){
        this.stickit();
      },

      beforeUnloadHandler: function(){
        if (that.modelChanged){
          return( 'There are changes in the form.  Do you want to leave them unsaved?');
        }
      },

      // SUBMIT HANDLER //
      submitClicked: function(e){
        e.preventDefault();
        this.trigger('form:submit');
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
      }

    });

  });

});
