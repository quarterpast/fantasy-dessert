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

describe('do', function() {
	it('should chain things', function() {
		expect(do {
			var a <- Id.of(5);
			return a;
		}).to.eql(Id.of(5));
	});

	it('should chain a bunch things', function() {
		expect(do {
			var a <- Id.of(5);
			var b <- Id.of(6);
			return b + 1;
		}).to.eql(Id.of(7));
	});

	it('should chain ignoring stuff', function() {
		expect(do {
			<- Id.of(5);
			return 6;
		}).to.eql(Id.of(6));
	});

	it('should chain a bunch of things ignoring stuff', function() {
		expect(do {
			<- Id.of(5);
			<- Id.of(6);
			return 7;
		}).to.eql(Id.of(7));
	});

	it('should work without tail return', function() {
		expect(do {
			<- Id.of(5);
			Id.of(6);
		}).to.eql(Id.of(6));
	});

	it('should support var bindings', function() {
		expect(do {
			var a = 5;
			Id.of(a);
		}).to.eql(Id.of(5));
	});
});