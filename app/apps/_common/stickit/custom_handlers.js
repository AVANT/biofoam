define(function(require){
  require('backbone.stickit');
  var Moonrakr = require('app');

  Backbone.Stickit.addHandler({
    selector: '#image-current-container',
    updateMethod: 'html',
    onGet: function(val){
      // console.log('custom onGet called');
      return '<img id="image-current" src=' + val + '>';
    },
    onSet: function(val, options){
      // console.log('custom onSet called');
      return $(val).attr('src');
    },
    updateModel: true,
    updateView: true,
    events: ['change']
  });

  return Backbone.Stickit

});