define(function(require){

  require('app');

  describe('Moonrakr App', function(){
    it('should exists', function(){
      expect(Moonrakr).to.be.a('object');
    });
  });

});