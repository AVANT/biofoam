/*jshint expr: true*/

define(function(require){

  require('apps/_entities/posts');

  describe('App.Entities Post Model', function(){

    it('has default values', function(){
      // create empty note model
      var model = new Moonrakr.Entities.Post();

      expect(model).to.be.ok;
      expect(model.get('title')).to.equal('');
      expect(model.get('excerpt')).to.equal('');
      expect(model.get('body')).to.equal('');
    });

    it('sets passed attributes', function(){
      // create empty note model
      var model = new Moonrakr.Entities.Post({
        title: 'Post Title',
        excerpt: 'Post excerpt.',
        body: 'lorem ipsum'
      });

      expect(model).to.be.ok;
      expect(model.get('title')).to.equal('Post Title');
      expect(model.get('excerpt')).to.equal('Post excerpt.');
      expect(model.get('body')).to.equal('lorem ipsum');
    });

    // can delete

    // can save

  });

});

