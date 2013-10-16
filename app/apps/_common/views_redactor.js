define(function(require){
  // require('redactor') // loaded w/ jquery?
  var Moonrakr = require('app');

  return Moonrakr.module('Common.Views', function(Views){

    // TO IMPLIMENT THIS VIEW YOU MUST
    // SET TEMPLATE HELPERS : 'textareaId' and 'textareaValue'

    // I havent decided whether this view will be implimented in the code base with a new view that extends this views functionality

    Views.redactor = Marionette.ItemView.extend({
      templateHelpers: {
        textareaId: 'redactor'
        textareaValue: ''
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
      }

    });

  });

});