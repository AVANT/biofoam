define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _postForm = require('text!apps/posts/_common/templates/post-form.html')

  return Moonrakr.module('PostsApp.Common.Views', function(Views){

    Views.Form = Marionette.ItemView.extend({
      template: Handlebars.compile( _postForm ),
      confirmDelete: 'Are you sure you want to delete this post?',
      formChanged: false,
      bypass: false,

      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked',
        'change input': 'inputChanged'
      },

      initialize: function(){
        var that = this;

        $( window ).bind( 'beforeunload', that.beforeUnloadHandler );

        $('a').bind('click', function(e){
          that.interiorNavigtionHanlder(e, that);
        });

        $(window).bind(window, 'statechange', function(){
          console.log('yayyyy');
        });

      },

      beforeUnloadHandler: function(){
        if (that.formChanged){
          return( 'There are changes in the form.  Do you want to leave them unsaved?');
        }
      },

      interiorNavigtionHanlder: function(e, that){
        console.log( 'that', that );
        if(!that.bypass){
            e.preventDefault();
            e.stopPropagation();
            bootbox.confirm('There are changes in the form.  Do you want to leave them unsaved?', function(result){
              if (result){
                that.bypass = true;
                $(e.target).trigger('click');
              }
            });
          }
      },

      inputChanged: function(){
        this.formChanged = true;
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
