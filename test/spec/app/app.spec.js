define(function(require){

  require('app');

  describe('Moonrakr App', function(){
    it('should exists', function(){
      expect(Moonrakr).to.be.an('object');
    });

    it('should have a config object with an "api" key', function(){
      expect( Moonrakr.Config ).to.be.an('object');
      expect( Moonrakr.Config.api ).to.be.equal('cheruisibesares.com');
    });

  });

});