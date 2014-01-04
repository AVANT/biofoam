describe('Chai object and array validation', function(){

  it('can do some cool stuff asserting', function(){

    // a: uses the js native 'typeof' test with extra support.  it is just a language chain when used with an 'object'
    expect('foo').is.a('string');
    expect('foo').is.not.a('number');
    expect({foo:'bar'}).is.an('object');

    // instanceof: checks whether the object is an instance of an expected constructor
    var Foo = function(){};
    var Bar = function(){};
    expect(new Foo()).is.an.instanceof(Foo);
    expect(new Bar()).is.not.an.instanceof(Foo);

    // etc ...

  });

});