/* jshint ignore: start */
var expect = require('expect.js');
var Id = require('fantasy-identities');

describe('>>=', function() {
	it('should chain a monad', function() {
		expect(Id.of(5) >>= idPlus1).to.eql(Id.of(6));

		function idPlus1(a) {
			return Id.of(a + 1);
		}
	});

	it('should work twice', function() {
		expect(Id.of(5) >>= idPlus1 >>= idPlus1).to.eql(Id.of(7));

		function idPlus1(a) {
			return Id.of(a + 1);
		}
	});

	it('should work with function expressions', function() {
		expect(Id.of(5) >>= function(a) {
			return Id.of(a + 1);
		}).to.eql(Id.of(6));
	});

	it('should work with function expressions twice', function() {
		expect(Id.of(5) >>= function(a) {
			return Id.of(a + 1);
		} >>= function(a) {
			return Id.of(a + 1);
		}).to.eql(Id.of(7));
	});

	//TODO test laziness (fantasy-io probably)
});

describe('>>', function() {
	it('should chain and discard monad', function() {
		expect(Id.of(5) >> Id.of(2)).to.eql(Id.of(2));
	});

	it('should work twice', function() {
		expect(Id.of(5) >> Id.of(2) >> Id.of(3)).to.eql(Id.of(3));
	});

	//TODO test laziness (fantasy-io probably)
});