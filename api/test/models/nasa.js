'use strict';

const {app, request, expect} = require('../shared')();
const helper = app.util.helper;
const model  = app.models.nasa;
const R = require('ramda');

describe('Nasa', () => {

  const daysAgo = 3;

  it('returns last 3 days from nasa api', done => {

      const range  = helper.getRangeOfDates(daysAgo);
      const source = model.getLastDays(range);

      source.subscribe(result => {
        expect(R.path(['response', 'statusCode'], result)).to.equal(200);
        done();
      });

  });

});
