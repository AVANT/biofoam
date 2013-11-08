define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _page = require('text!apps/about/show/templates/about.html');
  var _aboutLayout = require('text!apps/about/show/templates/about_layout.html');
  var _aboutPanel = require('text!apps/about/show/templates/page_panel.html');

  return Moonrakr.module('AboutApp.Show', function(Show){

    Show.Page = Marionette.ItemView.extend({
      template: Handlebars.compile( _page )
    });

    Show.Layout = Marionette.Layout.extend({
      template: Handlebars.compile( _aboutLayout ),
      regions: {
        panelRegion: '#panel-region',
        aboutRegion: '#page-region'
      }
    });

    Show.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      authLevelRequired: 3, // 3=editors
      template: Handlebars.compile( _aboutPanel ),
      triggers: {
        'click button.js-edit' : 'page:edit'
      }
    });

  });

});