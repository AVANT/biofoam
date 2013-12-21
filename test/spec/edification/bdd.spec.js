// var expect = chai.expect
// mocha.setup('bdd');

describe('BDD example', function(){

  // Runs once before all tests start.
  before(function(){
    this.hello = function(){
      return 'Hello World';
    }
  });

  // Runs once after all tests finish.
  after(function(){
    this.hello = null;
  });

  // Runs a single test in this suite.
  if('should return expected strin result', function(){
    expect(this.hello()).to.be.a('string').and
      .equal('Hello World');
  });

});