'use strict';

const {app, request, expect} = require('../shared')();

describe('Index', () => {

  describe('GET /', () => {

    it('returns 200 with a hello world message', (done) => {
      request.get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({ 'hello': 'world!' });
        done();
      });
    });

  });

});
