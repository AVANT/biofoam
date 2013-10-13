define(function(require){
  var loadImage = require('loadImage');
  require('jquery.jcrop');
  var Handlebars = require('handlebars');
  require('bootbox');
  var Moonrakr = require('app');
  var _userForm = require('text!apps/users/_common/templates/user_form.html');

  return Moonrakr.module('UsersApp.Common.Views', function(Views){

    Views.Form = Marionette.Layout.extend({
      confirmDelete: 'Are you sure you want to delete this?',
      template: Handlebars.compile( _userForm ),
      regions: {
        imageUploadRegion: '#image-uploader-region'
      },
      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked',
      },

      initialize: function(){
        console.log( this.imageUploadRegion );
      },

        /////////////////////////////////////
       // FORM SUBMIT AND DELETE HANDLERS //
      /////////////////////////////////////
      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      },

      deleteClicked: function(e){
        var that = this;
        e.preventDefault();
        bootbox.confirm('Are you sure you want to delete this User?', function(result){
          if(result){
            that.trigger('user:delete', that.model);
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