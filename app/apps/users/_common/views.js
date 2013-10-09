define(function(require){
  var loadImage = require('loadImage');
  require('jquery.jcrop');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _userForm = require('text!apps/users/_common/templates/user_form.html');

  return Moonrakr.module('UsersApp.Common.Views', function(Views){

    Views.Form = Marionette.ItemView.extend({
      confirmDelete: 'Are you sure you want to delete this?',
      template: Handlebars.compile( _userForm ),
      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-delete': 'deleteClicked',

        'click button.js-imageSubmit': 'imageSubmitClicked'
      },

        ///////////////////////////
       // IMAGE UPLOAD HANDLERS //
      ///////////////////////////

      // NEED TO DISABLE UPLOAD BUTTON AFTER ONE PHOTO

      onShow: function(){
        this.initImageLoad();
      },

      initImageLoad: function(){
        var that = this;
        // init image uploader and cropper
        this.$('#user-image').get(0).onchange = function(e){
          loadImage(
            e.target.files[0],
            function(img){
              this.$('#image-ui').get(0).appendChild(img);
              that.initJcrop();
            },
            // OPTIONS //
            {
            maxWidth: 600,
            canvas: true
            }
          );
        }
      },

      initJcrop: function(){
        var that = this;
        var img = this.$('canvas').get(0);

        this.$('canvas').Jcrop({
          setSelect: [40, 40 , 140, 140],
          onChange: function(coords){
            that.updateCoords(coords, that);
          },
          onSelect: function(coords){
            that.updateCoords(coords, that);
          },
          onRelease: function () {
            // disable submit button
          },
          aspectRatio: 1/1
        }, function(){
          var bounds = this.getBounds();
          console.log( 'bounds [x,y]: ', bounds[0], bounds[1] );
        });
      },

      updateCoords: function(c, that){
        console.log('update coords', c);
        that.coordinates = c;
      },

      imageSubmitClicked: function(e){
        e.preventDefault();
        this.cropHandler();
      },

      cropHandler: function(){
        var that = this;
        var img = this.$('canvas')[0];
        // console.log( img );
        // console.log( this.coordinates );
        if (img && this.coordinates){
          console.log( 'about to call loadImage', that.coordinates );
          this.replaceResults(loadImage.scale(img, {
            left: that.coordinates.x,
            top: that.coordinates.y,
            sourceWidth: that.coordinates.w,
            sourceHeight: that.coordinates.h
            // minWidth: img.width
          }));
        }
      },

      replaceResults: function(img){
        console.log( img );
        this.$('#image-ui').append(img);
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