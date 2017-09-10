'use strict';

const {app, request, expect} = require('../shared')();
const nasa   = app.models.nasa;
const helper = app.util.helper;
const model  = app.models.neo;
const R = require('ramda');

describe('Neo', () => {

  const daysAgo = 3;

  it('put data into database', done => {

      const range  = helper.getRangeOfDates(daysAgo);
      const source = nasa.getLastDays(range);

      source.switchMap(model.create)
      .subscribe(result => {

        expect(R.head(result))
        .to.have.all.keys('date', 'reference', 'name', 'isHazardous', 'speed');

        done();
      });

  });

});
