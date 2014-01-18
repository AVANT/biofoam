require('app');
require('handlebars');
require('bootbox');
require('apps/_common/stickit/custom_handlers');

var _userForm = require('text!apps/users/_common/templates/user_form.html');

return Moonrakr.module('Users.Common.Views', function(Views){

  /**
  @class Form
  @constructor
  **/
  Views.Form = Marionette.Layout.extend({
    confirmDelete: 'Are you sure you want to delete this?',
    template: Handlebars.compile( _userForm ),

    regions: {
      imageUploadRegion: '#image-upload-region'
    },

    events: {
      'click .js-submit': 'submitClicked',
      'click .js-delete': 'deleteClicked',
    },

    bindings: {
      '#user-username': 'username',
      '#user-email': 'email',
      '#image-current-container': 'image' // in the imageUpload view
    },

    onRender: function(){
      this.stickit();
    },

      /////////////////////////////////////
     // FORM SUBMIT AND DELETE HANDLERS //
    /////////////////////////////////////
    submitClicked: function(e){
      e.preventDefault();
      this.trigger('form:submit');
    },

    deleteClicked: function(e){
      var that = this;
      e.preventDefault();
      bootbox.confirm('Are you sure you want to delete this user?', function(result){
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
            $(this).removeClass('error');
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
