'use strict';

const app = require('../config/express')();
const request = require('supertest')(app);
const expect  = require('chai').expect;
const buildReq = () => ({
  body: {},
  originalUrl: '/'
});

module.exports = () => {
  return {app, request, expect};
};
