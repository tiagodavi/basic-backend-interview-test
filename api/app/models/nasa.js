'use strict';

module.exports = (app) => {

  const API_KEY = 'N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD';
  const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
  const R = require('ramda');
  const Observable = require('rx').Observable;
  const request  = require('request');
  const repository = {};

  repository.getLastDays = (range) => {

    const startDate = R.propOr('', 'startDate', range);
    const endDate = R.propOr('', 'endDate', range);

    return Observable.create(observer => {
      request(`${API_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&detailed=true`, (error, response, body) => {
        if(error) {
          observer.onError(error);
          observer.onCompleted();
        }else{
          observer.onNext({ response, body: JSON.parse(body) });
          observer.onCompleted();
        }
      });
    });

  };

  return repository;

};
