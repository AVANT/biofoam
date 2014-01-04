describe('Chai values', function(){

  it('will do some basic assetions', function(){

    // the truthy 'ok' value
    expect('foo').to.be.ok;
    expect(true).to.be.ok;
    expect(false).to.not.be.ok;

    // the 'exist' value is neither null nor undefined
    expect(false).to.exist;
    expect(null).to.not.exist;
    expect(undefined).to.not.exist;

    // the 'true' value is exactly true
    expect('foo').to.not.be.true;
    expect(true).to.be.true;

    // the 'false' value is exactly false
    expect('').to.not.be.false;
    expect(false).to.be.false;

    // the 'null' value is exactly false
    expect(null).to.be.null;

    // the 'undefined' value is exactly undefined
    expect(undefined).to.be.undefined;
    expect(null).to.not.be.undefined;

    // the 'arguments' value is the special JS arguments object which contains a list of parameters for the current function
    expect(arguments).to.be.arguments;
    expect([]).to.not.arguments;

  });

});