define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _about = require('text!apps/about/show/templates/about.html');
  var _aboutLayout = require('text!apps/about/show/templates/about_layout.html');
  var _aboutPanel = require('text!apps/about/show/templates/about_panel.html');

  return Moonrakr.module('AboutApp.Show', function(Show){

    Show.About = Marionette.ItemView.extend({
      template: Handlebars.compile( _about )
    });

    Show.Layout = Marionette.Layout.extend({
      template: Handlebars.compile( _aboutLayout ),
      regions: {
        panelRegion: '#panel-region',
        aboutRegion: '#about-region'
      }
    });

    Show.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      authLevelRequired: 3, // 3=editors
      template: Handlebars.compile( _aboutPanel ),
      triggers: {
        'click button.js-edit' : 'about:edit'
      }
    });

  });

});