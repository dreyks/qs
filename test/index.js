var Riddler = require('../');
var Lab = require('lab');

var describe = Lab.experiment;
var expect = Lab.expect;
var it = Lab.test;

describe('Riddler', function () {

    it('parses a simple string', function (done) {

        expect(Riddler.parse('a=b')).to.deep.equal({ a: 'b' });
        done();
    });

    it('parses a single nested string', function (done) {

        expect(Riddler.parse('a[b]=c')).to.deep.equal({ a: { b: 'c' } });
        done();
    });

    it('parses a double nested string', function (done) {

        expect(Riddler.parse('a[b][c]=d')).to.deep.equal({ a: { b: { c: 'd' } } });
        done();
    });

    it('only parses one level when depth = 1', function (done) {

        expect(Riddler.parse('a[b][c]=d', 1)).to.deep.equal({ a: { b: { '[c]': 'd' } } });
        expect(Riddler.parse('a[b][c][d]=e', 1)).to.deep.equal({ a: { b: { '[c][d]': 'e' } } });
        done();
    });

    it('parses a top level array', function (done) {

        expect(Riddler.parse('a[]=b')).to.deep.equal({ a: ['b'] });
        expect(Riddler.parse('a[]=b&a[]=c')).to.deep.equal({ a: ['b', 'c'] });
        done();
    });

    it('parses a nested array', function (done) {

        expect(Riddler.parse('a[b][]=c&a[b][]=d')).to.deep.equal({ a: { b: ['c', 'd'] } });
        done();
    });
});
