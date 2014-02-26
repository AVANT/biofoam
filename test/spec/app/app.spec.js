define(function(require){

  require('app');

  describe('App Dependencies', function(){
    it('should have backbone defined', function () {
      expect(Backbone).to.be.an('Object');
    })
  });

  describe('Moonrakr App', function(){

    it('should exist', function(){
      expect(Moonrakr).to.be.an('object');
    });

    it('should have a config object with an "api" key', function(){
      expect( Moonrakr.Config ).to.be.an('object');
      expect( Moonrakr.Config.api ).to.be.equal('/api');
    });

  });

});