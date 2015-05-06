require('app');
require('handlebars');
require('jquery.redactor');

var loadImage = require('loadImage');
var _redactorView = require('text!apps/_common/views/templates/redactor_view.html');

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
      var fileUploadUrl = Moonrakr.Config.api + '/media';
      this.$('.redactor').redactor({
        imageUpload: fileUploadUrl,
        fileUpload: fileUploadUrl,
        convertDivs: false,
        maxHeight: 600,
        replaceDivs: false,
        paragraphy: false,
        changeCallback: function(html){
          that.$('.redactor').html(html);
          that.$('.redactor').trigger('change');
          that.trigger('redactor:changed');
        },
        buttonsAdd: ['|', 'pre', 'foot', 'superscript'],
        buttonsCustom: {
          pre: {
            title: 'Code',
            callback: function()
            {
              this.blockSetAttr('class', 'photoCredit');
            }
          },
          foot: {
            title: 'foot',
            callback: function()
            {
              this.blockSetAttr('class', 'footnote');
            }
          },
          // superscript: {
          //   title: 'superscript',
          //   callback: function()
          //   {
          //     console.log('window.getSelection()', window.getSelection() );
          //     // this.formatBlocks('sub');
          //   }
          // }
        }
      }); // redactor
    }, // init redactor

    imageInsert: function( json ){
      console.log( json );
      this.$('.redactor').redactor('imageInsert', json);
    }

  });

});