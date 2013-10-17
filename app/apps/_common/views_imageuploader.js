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
        imageCurrentContainer: '#image-current-container'
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
          this.ui.imageInputLabel.text( 'Choose a different image to upload and crop:' );
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

        console.log('test');
        this.ui.imagePreview.append(img);
      },

      cropResult: function(img){
        // remove current uncropped img from the "preview" div
        this.ui.imagePreview.find('canvas')[0] = null;

        // reset previewed flag
        this.imagePreviewed = true;

        //reset upload dialog
        this.setImageUploadLabel()

        // clear any images that might be in "current" div
        // this.ui.imageCurrentContainer.empty();

        // insert new image into the current div
        // this.ui.imageCurrentContainer.append(img);

        //////////////
        // TESTING //
        // var image = new Image;
        var src = img.toDataURL('image/png');
        // var src = img.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        // var src = img.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "")
        // .src = src;
        this.ui.imageCurrentContainer.find('img').attr('src', src);
        this.ui.imageCurrentContainer.find('img').trigger('change');
        /////////////

        this.trigger('image:current', src);

        // disable crop button
        this.disableCrop();

        // stop jcrop
        this.jcrop_api.destroy();

      }

    });

  });

});