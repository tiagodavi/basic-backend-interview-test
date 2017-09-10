'use strict';

const {app, request, expect} = require('../shared')();
const R = require('ramda');

describe('Neo', () => {

  describe('GET /neo/hazardous', () => {

    it('returns 200 with all hazardous asteroids', (done) => {
      request.get('/neo/hazardous')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(R.head(res.body.data))
        .to.have.all.keys('_id', 'date', 'reference', 'name', 'isHazardous', 'speed');
        done();
      });
    });

  });

  describe('GET /neo/fastest', () => {

    it('returns 200 with the fastest asteroid NOT Hazardous', (done) => {
      request.get('/neo/fastest')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data)
        .to.have.all.keys('_id', 'date', 'reference', 'name', 'isHazardous', 'speed');
        expect(res.body.data.isHazardous).to.equal(false);
        done();
      });
    });

    it('returns 200 with the fastest asteroid Hazardous', (done) => {
      request.get('/neo/fastest?hazardous=true')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data)
        .to.have.all.keys('_id', 'date', 'reference', 'name', 'isHazardous', 'speed');
        expect(res.body.data.isHazardous).to.equal(true);
        done();
      });
    });

  });

  describe('GET /neo/best-year', () => {

    it('returns 200 with a year with most asteroids NOT Hazardous', (done) => {
      request.get('/neo/best-year')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys('year');
        done();
      });
    });

    it('returns 200 with a year with most asteroids Hazardous', (done) => {
      request.get('/neo/best-year?hazardous=true')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys('year');
        done();
      });
    });

  });

  describe('GET /neo/best-month', () => {

    it('returns 200 with the fastest asteroid NOT Hazardous', (done) => {
      request.get('/neo/best-month')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys('month');
        done();
      });
    });

    it('returns 200 with the fastest asteroid Hazardous', (done) => {
      request.get('/neo/best-month?hazardous=true')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys('month');
        done();
      });
    });

  });

});
