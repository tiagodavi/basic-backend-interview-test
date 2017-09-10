'use strict';

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = () => {

  const app = express();

  app.set('httpPort',  3000);

  //https://github.com/helmetjs/helmet
  app.use(helmet.hidePoweredBy({ setTo: 'Basic Interview' }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.noCache());

  //Show coverage/documentation
  app.use(express.static('./public'));

  //https://github.com/expressjs/body-parser
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));

  //https://github.com/expressjs/method-override
  app.use(require('method-override')());

  consign({cwd: 'app'})
  .include('util')
  .then('schemas')
  .then('models')
  .then('controllers')
  .then('routers')
  .into(app);

  return app;
};
