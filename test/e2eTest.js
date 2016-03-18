var request = require('supertest');
var stockRepository = require('../inMemoryStockRepository')();
var assert = require('assert');


describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        var noOp = function(req, res, next) {
            next();
        }
        var app = require('../app')(stockRepository, noOp);
        request(app).
            post('/stock').
            send({
                "isbn": "1234567890",
                "count": 10
            }).
            set('Content-Type', 'application/json').
            expect('Content-Type', /json/).
            expect(200).
            end(function (err, res) {
                if (err) return done(err);
                assert.equal(res.body.isbn, "1234567890");
                done();
            });
    });

    it('should not allow to use app w/o valid credentials', function(done) {
        var auth = require('../auth')('admin', 'admin');
        var app = require('../app')(stockRepository, auth);

        request(app).get('/').expect(401, done);
    });
});