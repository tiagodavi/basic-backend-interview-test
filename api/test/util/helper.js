'use strict';

const {app, request, expect} = require('../shared')();
const helper = app.util.helper;

describe('Helper', () => {

  const daysAgo = 3;
  
  it('builds the correct dates', done => {

      const startDate = new Date(2017, 7, 4);
      const endDate = new Date(2017, 7, 7);

      const startResult = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`;
      const endResult = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`;

      const start = helper.buildDate(daysAgo, new Date(2017, 7, 7));
      const end = helper.buildDate(undefined, new Date(2017, 7, 7));

      expect(startResult).to.equal(start);
      expect(endResult).to.equal(end);

      done();

  });

  it('returns a range of dates starting 3 days ago', done => {

      const source = helper.getRangeOfDates(daysAgo);

      expect(source).to.have.all.keys('startDate', 'endDate');

      done();

  });

});
