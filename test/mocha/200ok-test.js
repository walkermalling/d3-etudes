'use strict';
require('../../server');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);
var expect = chai.expect;

describe('200 ok', function() {
  it('should get 200', function(done) {
    chai.request('http://localhost:3000')
      .get('/')
      .res(function(res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});