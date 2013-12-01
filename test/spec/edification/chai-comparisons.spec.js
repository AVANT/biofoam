describe('Chai comparisons', function(){

  it('can do some cool stuff', function(){

    // equal: strict (===) equality
    expect('foo').to.equal('foo');
    expect({foo:'bar'}).to.not.equal({foo:'bar'});

    // eql: deep equality and equvalent to deep.equal
    expect('foo').to.eql('foo');
    expect({foo:'bar'}).to.eql({foo:'bar'});

    // above: the actual value is greater than the expected value
    expect(1).to.not.be.above(1);
    expect(5).to.be.above(2);

    // least: the actual val is greater than or equal to the expected val
    expect(1).to.be.at.least(1);
    expect(5).to.be.at.least(2);

    // below: the actual val is less than the expected val
    expect(1).to.not.be.below(1);
    expect(1).to.be.below(2);

    // most: the actual val is less than or equal to the expected val
    expect(1).to.be.at.most(1);
    expect(1).to.be.at.most(2);

    // within: the actual val is within the range of expected val
    expect(1).to.be.within(0,2);

    // within: the actual val is within the range of expected val
    expect(1.2).to.be.closeTo(1, 0.2);
    expect(1.2).to.not.be.closeTo(1, 0.0);

    // match: the actual string value is matched by the expected regular expression
    expect('foo').to.match(/^f[o]+/);

    // string: the actual string val contains the expected substring
    expect('foo bar').to.have.string('foo');

    // satisfy: the eval func takes the actual val as a parameter and returns true if the assertion should pass
    expect(42).to.satisfy(function(val){
      return val === 6*7;
    });

  });

});