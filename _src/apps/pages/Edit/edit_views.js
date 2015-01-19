require('handlebars');
require('app');
require('apps/_common/views/redactor');
var _pageLayout = require('text!apps/pages/edit/templates/page_layout.html');

return Moonrakr.module('Pages.Edit', function(Edit){

  Edit.Page = Marionette.Layout.extend({
    template: Handlebars.compile( _pageLayout ),
    regions: {
      redactorRegion: '#redactor-region'
    },
    events: {
      'click .js-submit': 'submitClicked'
    },
    submitClicked: function(e){
      e.preventDefault();
      var data = {
        'content': this.$('#redactor').redactor('get')
      };
      this.trigger('form:submit', data);
    }
  });

  Edit.Redactor = Moonrakr.Common.Views.Redactor.extend();

});