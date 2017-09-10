'use strict';

module.exports = (app) => {

  const mongoose = require('mongoose');
  const {connectionString, options} = app.util.connection.getInstance();
  mongoose.Promise = global.Promise;
  mongoose.connect(connectionString, options);

  const repository = {};

  repository.getModel = () => {
    try {
        if(mongoose.model('Neo')) {
           return mongoose.model('Neo');
        }
      } catch(e) {
        if(e.name === 'MissingSchemaError') {
           let schema = new mongoose.Schema({
             date: Date,
             reference: Number,
             name: String,
             speed: Number,
             isHazardous: { type: Boolean, default: false }
           });
          return mongoose.model('Neo', schema, 'Neo');
      }
    }
  };

  return repository;

};
