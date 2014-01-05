require('app');

var loadImage = require('loadImage');
require('jquery.jcrop');
require('canvasToBlob');

require('handlebars');
var _imageuploadView = require('text!apps/media/new/templates/uploader.html');

return Moonrakr.module('Media.New', function(New){

  New.Uploader = Marionette.ItemView.extend({
    template: Handlebars.compile( _imageuploadView ),
    imagePreviewed: false,
    ui: {
      submitButton: 'button.js-image-submit',
      cropButton: 'button.js-crop',
      imageInputLabel: '#image-input-label',
      imagePreview: '#image-preview',
      imageCurrentContainer: '#image-current-container'
    },
    events: {
      'click button.js-crop': 'cropClicked',
      'click #dragPad': 'padClicked',
      'dragover #dragPad': 'dragoverEvent',
      'drop #dragPad': 'droppedEvent',
      'change .image-input': 'inputChanged',

      'click .js-image-submit': 'submitClicked'
    },

    padClicked: function(){
      this.$el.find('.image-input').trigger('click');
    },

    inputChanged: function(e){
      var self = this;
      this.loadImage(e, self);
    },

    loadImage: function(e, self){
      // var self = self;

      e.preventDefault();
      e = e.originalEvent;

      var target = e.dataTransfer || e.target;
      var file = target && target.files && target.files[0];
      var options = {
        maxWidth: 600,
        canvas: true
      };

      if(!file){ return; }

      loadImage(file,
        function(img){
          self.replaceResults(img);
          self.imagePreviewed = true;
          self.setImageUploadLabel();
          self.initJcrop();
        },
        options
      );

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
        onRelease: function(){
          that.disableCrop();
          that.coordinates = null;
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

    dragoverEvent: function(e){
      e.preventDefault();
      // get the orig event that has the dataTransfer option
      e = e.originalEvent;
      // allows the user to drop an image
      e.dataTransfer.dropEffect = 'copy';
    },

    droppedEvent: function(e){
      var self = this;
      e.preventDefault();
      this.loadImage(e, self);
    },

    cropHandler: function(){
      var that = this;
      var img = this.$('canvas')[0];
      if (img && this.coordinates){
        this.cropResult(loadImage.scale(img,{
          left: that.coordinates.x,
          top: that.coordinates.y,
          sourceWidth: that.coordinates.w,
          sourceHeight: that.coordinates.h,
          canvas: true
        }));
        this.enableSubmit();
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
      this.setImageUploadLabel();


      var src = img.toDataURL('image/png');
      window.debugImg = img;

      // add blob to model
      var toSave;
      img.toBlob(function(blob){
        toSave = blob;
      },
      'image/jpeg');
      this.model.set('blob', toSave);

      this.ui.imageCurrentContainer.find('img').attr('src', src);
      this.ui.imageCurrentContainer.trigger('change');

      this.trigger('image:current', src);

      // disable crop button
      this.disableCrop();

      // stop jcrop
      this.jcrop_api.destroy();

    },

    enableSubmit: function(){
      this.ui.submitButton.removeAttr('disabled');
    },
    disableSubmit: function(){
      this.ui.submitButton.attr('disabled', 'disabled');
    },
    submitClicked: function(e){
      e.preventDefault();
      this.trigger('media:new:submit');
    }
  });

});