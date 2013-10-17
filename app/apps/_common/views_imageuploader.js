define(function(require){
  var loadImage = require('loadImage');
  require('jquery.jcrop');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _imageuploadView = require('text!apps/_common/templates/imageupload_view.html');

  return Moonrakr.module('Common.Views', function(Views){

    Views.ImageUpload = Marionette.ItemView.extend({
      template: Handlebars.compile( _imageuploadView ),
      imagePreviewed: false,
      ui: {
        cropButton: 'button.js-crop',
        imageInputLabel: '#image-input-label',
        imagePreview: '#image-preview',
        imageCurrent: '#image-current'
      },
      events: {
        'click button.js-crop': 'cropClicked'
      },

      onShow: function(){
        this.initImageLoad();
      },

      initImageLoad: function(){
        var that = this;
        this.$('#image-input').get(0).onchange = function(e){
          loadImage(
            e.target.files[0],
            function(img){
              that.replaceResults(img);
              that.imagePreviewed = true;
              that.setImageUploadLabel();
              that.initJcrop();
            },
            { // OPTIONS
              maxWidth: 600,
              canvas: true
            }
          );
        }
      },

      initJcrop: function(){
        var that = this;
        var img = this.$('canvas').get(0);

        this.ui.imagePreview.find('canvas').Jcrop({
          setSelect: [40, 40, img.width - 40, img.height - 40],
          onChange: function(coords){
            that.updateCoords(coords, that);
            that.enableCrop();
          },
          onSelect: function(coords){
            that.updateCoords(coords, that);
            that.enableCrop();
          },
          onRelease: function(coords){
            that.disableCrop();
            that.coordinates = null
          },
          aspectRatio: 1/1
        },
        function(){
          that.jcrop_api = this;
        });
      },

      enableCrop: function(){
        this.ui.cropButton.removeAttr('disabled');
      },

      disableCrop: function(){
        this.ui.cropButton.attr('disabled', 'disabled');
      },

      setImageUploadLabel: function(){
        if ( this.imagePreviewed ){
          this.ui.imageInputLabel.text( 'Choose a differnt image to upload and crop:' );
        }
        else {
          this.ui.imageInputLabel.text( 'Choose an image to upload and crop:' );
        }
      },

      updateCoords: function(c, that){
        that.coordinates = c;
      },

      cropClicked: function(e){
        e.preventDefault();
        this.cropHandler();
      },

      cropHandler: function(){
        var that = this;
        var img = this.$('canvas')[0];
        if (img && this.coordinates){
          this.cropResult(loadImage.scale(img,{
            left: that.coordinates.x,
            top: that.coordinates.y,
            sourceWidth: that.coordinates.w,
            sourceHeight: that.coordinates.h
          }));
        }
      },

      replaceResults: function(img){
        if( this.ui.imagePreview.find('canvas').length ){
        //   // destory jcrop and remove the canvas
          this.ui.imagePreview.find('canvas')[0] = null;
          this.disableCrop();
          this.jcrop_api.destroy();
        }

        this.ui.imagePreview.append(img);
      },

      cropResult: function(img){
        // remove current uncropped img from the "preview" div
        this.ui.imagePreview.find('canvas')[0] = null;

        // clear any images that might be in "current" div
        this.ui.imageCurrent.empty();

        // insert new image into the current div
        this.ui.imageCurrent.append(img);

        // disable crop button
        this.disableCrop();

        // stop jcrop
        this.jcrop_api.destroy();

      }

    });

  });

});