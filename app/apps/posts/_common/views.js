define(function(require){
  require('backbone.stickit');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _postForm = require('text!apps/posts/_common/templates/post-form.html')

  return Moonrakr.module('PostsApp.Common.Views', function(Views){

    Views.Form = Marionette.ItemView.extend({
      template: Handlebars.compile( _postForm ),
      confirmDelete: 'Are you sure you want to delete this post?',
      formChanged: false,

      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked',

        'change input': 'inputChanged',
      },

      bindings: {
        '#post-title': 'title',
        '#post-excerpt': 'excerpt',
        '#post-body': 'body'
      },

      inputChanged: function(){
        this.formChanged = true;
      },

      onRender: function(){
        var that = this;

        this.$('.redactor').redactor({
          changeCallback: function(html){
            that.$('.redactor').html(html);
            that.$('.redactor').trigger('change');
            that.trigger('redactor:changed');
          }
        });

        that.stickit();
      },

      initialize: function(){
        var that = this;
        $( window ).bind( 'beforeunload', that.beforeUnloadHandler );
      },

      beforeUnloadHandler: function(){
        if (that.formChanged){
          return( 'There are changes in the form.  Do you want to leave them unsaved?');
        }
      },

      // SUBMIT HANDLER //
      submitClicked: function(e){
        e.preventDefault();
        this.trigger('form:submit', data);
      },

      // DELETE HANDLER //
      deleteClicked: function(e){
        var that = this;
        e.preventDefault();
        bootbox.confirm(that.confirmDelete, function(result){
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
