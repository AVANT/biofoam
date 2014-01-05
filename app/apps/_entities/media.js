define(function(require){

  var Moonrakr = require('app');
  var c2b = require('canvasToBlob');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Media = Backbone.Model.extend({
      defaults: {
        'blob': c2b('data:image/gif;base64,R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7')
      },
      url: function(){
        return Moonrakr.Config.api + '/media';
      },
      save: function(data, options){

        // using FormData will force the ajax content-type to be multipart/form
        var fd = new FormData();
        fd.append('blob', this.get('blob'));

        // extend the ajax options passed in with these few options need to make the call multipart
        var opts = _.extend(options, {
          data: fd,
          contentType: false,
          processData: false,
        });

        // call the original save method in the context of this object and pass thru the normal args as an array
        Backbone.Model.prototype.save.apply(this, [data, opts]);
      }
    });

  });

});