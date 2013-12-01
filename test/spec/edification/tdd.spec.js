// var assert = chai.assert;
// mocha.setup('tdd');

suite('TDD example', function(){

  // Runs once before all tests start.
  suiteSetup(function(){
    this.hello = function(){
      return 'Hello World';
    }
  });

  // Runs once when all tests finish.
  suiteTeardown(function(){
    this.hello = null;
  });

  test('expected string result', function(){
    assert.isString(this.hello());
    assert.strictEqual(this.hello(), 'Hello World');
  });

});