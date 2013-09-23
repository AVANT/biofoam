define(function(require){

  var Handlebars = require('handlebars');
  require('backbone.syphon');

  var Moonrakr = require('app'),
      _edit = require('text!apps/posts/edit/templates/edit.html');

  return Moonrakr.module('PostsApp.Edit', function(Edit){

    Edit.Post = Marionette.ItemView.extend({
      template: Handlebars.compile( _edit ),

      events: {
        'click button.js-submit': 'submitClicked'
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      },

      onFormDataInvalid: function(errors){
        var self = this;
        var markErrors = function(value, key){
          var $controlGroup = self.$el.find('#post-' + key).parent();
          var $errorEl = $('<span>', {class: 'help-inline error', text: value});
          $controlGroup.append($errorEl).addClass('error');
        };
        _.each(errors, markErrors);
      }
    });


  }); // return

}); // define