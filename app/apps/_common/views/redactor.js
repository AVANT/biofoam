require('jquery.redactor');
var loadImage = require('loadImage');
require('handlebars');
require('app');
var _redactorView = require('text!apps/_common/views/templates/redactor_view.html')

return Moonrakr.module('Common.Views', function(Views){

  /*
    TO IMPLIMENT THIS VIEW YOU CAN
    SET TEMPLATE HELPERS BY PASSING IN
    OPTIONS APPROPREATELY
  */

  Views.Redactor = Marionette.ItemView.extend({
    template: Handlebars.compile( _redactorView ),
    templateHelpers: {
      textareaId: 'redactor',
      textareaValue: ''
    },
    events: {
      'click #hidden-image-input': 'test'
    },
    test: function(){
      console.log('herro!');
    },
    initialize: function(options){
      this.templateHelpers = {
        textareaId: this.options.textareaId,
        textareaValue: this.options.textareaValue
      };
    },
    onRender: function(){
      this.initImageInput();
      this.initRedactor();
    },

    // use redactor.imageInsert (ln: 5829) after I figure out how to get the source out of the loadImage functionality

    initImageInput: function(){
      var that = this;
      this.$('#hidden-image-input').get(0).onchange = function(e){
        loadImage(
          e.target.files[0],
          function(img){
            console.log( img );
            console.log( img.toDataURL() );
            that.imageInsert({'filelink': img.toDataURL() });
          },
          { // loadImage Options
            canvas: true
          }
        );
      }
    },

    initRedactor: function(){
      var that = this;
      this.$('.redactor').redactor({
        // trying this on for size
        air: true,
        //////////////////////////
        changeCallback: function(html){
          that.$('.redactor').html(html);
          that.$('.redactor').trigger('change');
          that.trigger('redactor:changed');
        },
        buttonsCustom: {
          image: {
            title: "Advanced List",
            dropdown: {
              image: {
                title: 'Upload Image From the Web',
                callback: this.imageShow
              },
              point2: {
                title: 'Upload Image From Your Computer',
                callback: function(){
                  that.$('#hidden-image-input').trigger('click');
                }
              }
            }
          }
        }
      }); // redactor
    }, // init redactor

    imageInsert: function( json ){
      console.log( json );
      this.$('.redactor').redactor('imageInsert', json);
    }

  });

});