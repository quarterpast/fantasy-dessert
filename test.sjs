/* jshint ignore: start */
var expect = require('expect.js');
var Id = require('fantasy-identities');

describe('>>=', function() {
	it('should chain a monad', function() {
		expect(Id.of(5) >>= function(a) {
			return Id.of(a + 1);
		}).to.eql(Id.of(6));
	});
});