define(function(require){
  // require('redactor') // loaded w/ jquery?
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _redactorView = require('text!apps/_common/templates/redactor_view.html')

  return Moonrakr.module('Common.Views', function(Views){

    // TO IMPLIMENT THIS VIEW YOU CAN
    // SET TEMPLATE HELPERS BY PASSING IN
    // OPTIONS APPROPREATELY

    Views.Redactor = Marionette.ItemView.extend({
      template: Handlebars.compile( _redactorView ),
      templateHelpers: {
        textareaId: 'redactor',
        textareaValue: ''
      },
      initialize: function(options){
        this.templateHelpers = {
          textareaId: this.options.textareaId,
          textareaValue: this.options.textareaValue
        };
      },
      onRender: function(){
        var that = this;
        this.$('.redactor').redactor({
          changeCallback: function(html){
            that.$('.redactor').html(html);
            that.$('.redactor').trigger('change');
            that.trigger('redactor:changed');
            console.log('redactor:changed has been triggered');
          }
        });
      }
    });

  });

});